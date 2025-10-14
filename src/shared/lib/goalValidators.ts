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

export const validateWeeklyGoal = (value: number, maxValue: number): { isSuccess: boolean; msg: string | null } => {
  if (!Number.isInteger(value)) {
    return { isSuccess: false, msg: '주간 목표는 정수만 입력 가능합니다.' };
  }
  if (value < 0) {
    return { isSuccess: false, msg: '주간 목표는 0 이상의 값이어야 합니다.' };
  }
  if (value > maxValue) {
    return { isSuccess: false, msg: '주간 목표값이 너무 큽니다.' };
  }
  return { isSuccess: true, msg: null };
};