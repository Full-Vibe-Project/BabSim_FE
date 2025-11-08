import { z } from "zod";

const baseSchema = z.object({
    name: z
        .string()
        .min(1, { message: "이름은 필수 입력 항목입니다." })
        .max(30, { message: "이름은 30자 이하로 입력해주세요." })
        .regex(/^[a-zA-Z가-힣\s]+$/, {
            message: "이름에는 특수문자나 숫자를 포함할 수 없습니다.",
        }),
    gender: z.enum(["FEMALE", "MALE"], {
        error: "유효한 성별을 선택해주세요.",
    }),
    birthdate: z.string().superRefine((val, ctx) => {
        if (
            !/\d{4}-\d{2}-\d{2}/.test(val) ||
            new Date(val).toString() === "Invalid Date"
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "유효하지 않은 날짜 형식입니다. (YYYY-MM-DD)",
            });
            return;
        }
        const [year, month, day] = val.split("-").map(Number);
        const dateFromParts = new Date(year, month - 1, day);
        if (
            dateFromParts.getFullYear() !== year ||
            dateFromParts.getMonth() !== month - 1 ||
            dateFromParts.getDate() !== day
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "실제로 존재하지 않는 날짜입니다. (예: 2월 30일)",
            });
            return;
        }
        if (new Date(val) > new Date()) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "생년월일은 오늘보다 미래일 수 없습니다.",
            });
            return;
        }
    }),
    height: z
        .number()
        .int({ message: "유효한 키를 입력해주세요." })
        .min(1, { message: "유효한 키를 입력해주세요." })
        .max(1000, { message: "키는 1000cm 이하로 입력해주세요." }),
    weight: z
        .number()
        .min(0.1, { message: "유효한 몸무게를 입력해주세요." })
        .max(1000, { message: "몸무게는 1000kg 이하로 입력해주세요." })
        .refine(
            (val) => {
                const s = String(val);
                return !s.includes(".") || s.split(".")[1].length <= 1;
            },
            { message: "유효한 몸무게를 입력해주세요." }
        ),
    healthConditions: z.object({
        allergies: z.array(z.string()).optional(),
        chronicDiseases: z.array(z.string()).optional(),
        dietPreferences: z.array(z.string()).optional(),
    }),
    weeklyGoal: z.number(),
    exerciseCount: z.number(),
});

const weightManagementSchema = baseSchema
    .extend({
        goalType: z.literal("WEIGHT_MANAGEMENT"),
        currentWeight: z.number({
            error: "체중 관리를 위해 현재 체중과 목표 체중을 입력해주세요.",
        }),
        targetWeight: z.number({
            error: "체중 관리를 위해 현재 체중과 목표 체중을 입력해주세요.",
        }),
    })
    .refine((data) => data.currentWeight !== data.targetWeight, {
        message: "목표 체중은 현재 체중과 같을 수 없습니다.",
        path: ["targetWeight"],
    })
    .refine((data) => data.currentWeight > 0, {
        message: "체중은 0보다 커야 합니다.",
        path: ["currentWeight"],
    })
    .refine((data) => data.targetWeight > 0, {
        message: "체중은 0보다 커야 합니다.",
        path: ["targetWeight"],
    });

const dietManagementSchema = baseSchema.extend({
    goalType: z.literal("DIET_MANAGEMENT"),
});

const healthManagementSchema = baseSchema.extend({
    goalType: z.literal("HEALTH_MANAGEMENT"),
});

export const onboardingSchema = z.discriminatedUnion("goalType", [
    weightManagementSchema,
    dietManagementSchema,
    healthManagementSchema,
]);

export type OnboardingData = z.infer<typeof onboardingSchema>;
