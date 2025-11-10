export const validateGoalWeight = (currentWeight: number, targetWeight: number): { isSuccess: boolean; msg: string | null } => {
  if (isNaN(currentWeight) || isNaN(targetWeight) || currentWeight <= 0 || targetWeight <= 0) {
    return { isSuccess: false, msg: '유효한 체중을 입력해주세요.' };
  }
  if (currentWeight < 20 || currentWeight > 200 || targetWeight < 20 || targetWeight > 200) {
    return { isSuccess: false, msg: '체중은 20kg 이상, 200kg 이하로 입력해주세요.' };
  }
  if (currentWeight === targetWeight) {
    return { isSuccess: false, msg: '목표 체중은 현재 체중과 같을 수 없습니다.' };
  }
  return { isSuccess: true, msg: null };
};

export const validateTargetCalories = (calories: number): { isSuccess: boolean; msg: string | null } => {
  if (isNaN(calories) || calories <= 0) {
    return { isSuccess: false, msg: '유효한 칼로리를 입력해주세요.' };
  }
  if (calories < 500 || calories > 10000) {
    return { isSuccess: false, msg: '칼로리는 500 이상 10000 이하로 설정해주세요.' };
  }
  return { isSuccess: true, msg: null };
};

export const validateActivityLevel = (level: string): { isSuccess: boolean; msg: string | null } => {
  const validLevels = ['SEDENTARY', 'LIGHTLY_ACTIVE', 'MODERATELY_ACTIVE', 'VERY_ACTIVE'];
  if (!validLevels.includes(level)) {
    return { isSuccess: false, msg: '유효한 활동 수준을 선택해주세요.' };
  }
  return { isSuccess: true, msg: null };
};
