import { describe, it, expect } from 'vitest';
import { onboardingSchema } from './onboarding.schema';

describe('onboardingSchema', () => {
  const baseValidData = {
    name: '김밥심',
    gender: 'FEMALE',
    birthdate: '1995-10-26',
    height: 165,
    weight: 55,
    healthConditions: {
        allergies: [],
        chronicDiseases: [],
        dietPreferences: [],
    },
    goalType: 'WEIGHT_MANAGEMENT',
    currentWeight: 55,
    targetWeight: 50,
    weeklyGoal: 500,
    exerciseCount: 3,
  };

  it("should successfully validate a complete and valid data object for the 'WEIGHT_MANAGEMENT' goal", () => {
    const result = onboardingSchema.safeParse(baseValidData);
    expect(result.success).toBe(true);
  });

  it('should fail validation if a required field from the first step (name) is missing', () => {
    const invalidData = { ...baseValidData, name: '' };
    const result = onboardingSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('이름은 필수 입력 항목입니다.');
    }
  });

  it("should fail validation if targetWeight is the same as currentWeight when goalType is 'WEIGHT_MANAGEMENT'", () => {
    const invalidData = { ...baseValidData, targetWeight: 55 };
    const result = onboardingSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('목표 체중은 현재 체중과 같을 수 없습니다.');
    }
  });

  it("should pass validation if goalType is not 'WEIGHT_MANAGEMENT' even if weights are not provided", () => {
    const { currentWeight, targetWeight, ...rest } = baseValidData;
    const validData = {
        ...rest,
        goalType: 'DIET_MANAGEMENT',
    };
    const result = onboardingSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});