import { z } from 'zod';

export const onboardingSchema = z.object({
  name: z.string().min(1, { message: '이름은 필수 입력 항목입니다.' }).max(30, { message: '이름은 30자 이하로 입력해주세요.' }).regex(/^[a-zA-Z가-힣\s]+$/, { message: '이름에는 특수문자나 숫자를 포함할 수 없습니다.' }),
  gender: z.enum(['FEMALE', 'MALE'], { errorMap: () => ({ message: '성별을 선택해주세요.' }) }),
  birthdate: z.string().refine((val) => {
    if (!/\d{4}-\d{2}-\d{2}/.test(val)) return false;
    const date = new Date(val);
    if (date.toString() === 'Invalid Date') return false;
    const [year, month, day] = val.split('-').map(Number);
    const dateFromParts = new Date(year, month - 1, day);
    if (dateFromParts.getFullYear() !== year || dateFromParts.getMonth() !== month - 1 || dateFromParts.getDate() !== day) {
        return false;
    }
    return date <= new Date();
  }, (val) => {
    if (!/\d{4}-\d{2}-\d{2}/.test(val) || new Date(val).toString() === 'Invalid Date') {
        return { message: '유효하지 않은 날짜 형식입니다.' };
    }
    const [year, month, day] = val.split('-').map(Number);
    const dateFromParts = new Date(year, month - 1, day);
    if (dateFromParts.getFullYear() !== year || dateFromParts.getMonth() !== month - 1 || dateFromParts.getDate() !== day) {
        return { message: '유효하지 않은 날짜 형식입니다.' };
    }
    if (new Date(val) > new Date()) {
      return { message: '생년월일은 오늘보다 미래일 수 없습니다.' };
    }
    return { message: '유효하지 않은 날짜 형식입니다.' };
  }),
  height: z.number().int({ message: '유효한 키를 입력해주세요.' }).min(1, { message: '유효한 키를 입력해주세요.' }).max(1000, { message: '키는 1000cm 이하로 입력해주세요.' }),
  weight: z.number().min(0.1, { message: '유효한 몸무게를 입력해주세요.' }).max(1000, { message: '몸무게는 1000kg 이하로 입력해주세요.' }).refine(val => {
    const s = String(val);
    return !s.includes('.') || s.split('.')[1].length <= 1;
  }, { message: '유효한 몸무게를 입력해주세요.' }),
  healthConditions: z.array(z.string()),
  allergies: z.array(z.string()),
  goalType: z.enum(['WEIGHT_MANAGEMENT', 'DIET_MANAGEMENT', 'HEALTH_MANAGEMENT']),
  currentWeight: z.number().optional(),
  targetWeight: z.number().optional(),
  weeklyGoal: z.number(),
  exerciseCount: z.number(),
}).superRefine((data, ctx) => {
  if (data.goalType === 'WEIGHT_MANAGEMENT') {
    if (data.currentWeight === data.targetWeight) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '목표 체중은 현재 체중과 같을 수 없습니다.',
        path: ["targetWeight"],
      });
    }
  }
});

export type OnboardingData = z.infer<typeof onboardingSchema>;