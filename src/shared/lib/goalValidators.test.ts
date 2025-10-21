import { describe, it, expect } from 'vitest';
import { validateGoalWeight, validateWeeklyGoal } from './goalValidators';

describe('validateGoalWeight', () => {
  it('(AC-1) should return a success object for valid and different current and target weights', () => {
    expect(validateGoalWeight(70, 65)).toEqual({ isSuccess: true, msg: null });
  });

  it('(AC-2) should return an "identicalWeight" error object if current and target weights are the same', () => {
    expect(validateGoalWeight(70, 70)).toEqual({ isSuccess: false, msg: '목표 체중은 현재 체중과 같을 수 없습니다.' });
  });

  it('(AC-3) should return an "invalid" error object for non-numeric or negative weights', () => {
    expect(validateGoalWeight(-70, 65)).toEqual({ isSuccess: false, msg: '유효한 체중을 입력해주세요.' });
    expect(validateGoalWeight(70, -65)).toEqual({ isSuccess: false, msg: '유효한 체중을 입력해주세요.' });
  });

  it('(AC-4) should return an "outOfRange" error object if weights are outside the valid range', () => {
    expect(validateGoalWeight(19, 65)).toEqual({ isSuccess: false, msg: '체중은 20kg 이상, 200kg 이하로 입력해주세요.' });
    expect(validateGoalWeight(201, 65)).toEqual({ isSuccess: false, msg: '체중은 20kg 이상, 200kg 이하로 입력해주세요.' });
    expect(validateGoalWeight(70, 19)).toEqual({ isSuccess: false, msg: '체중은 20kg 이상, 200kg 이하로 입력해주세요.' });
    expect(validateGoalWeight(70, 201)).toEqual({ isSuccess: false, msg: '체중은 20kg 이상, 200kg 이하로 입력해주세요.' });
  });
});

describe('validateWeeklyGoal', () => {
  it('(AC-5) should return a success object for a valid weekly goal value within the limit', () => {
    expect(validateWeeklyGoal(500, 1000)).toEqual({ isSuccess: true, msg: null });
    expect(validateWeeklyGoal(0, 1000)).toEqual({ isSuccess: true, msg: null });
  });

  it('(AC-6) should return a "negativeValue" error object for a negative number', () => {
    expect(validateWeeklyGoal(-100, 1000)).toEqual({ isSuccess: false, msg: '주간 목표는 0 이상의 값이어야 합니다.' });
  });

  it('(AC-7) should return a "notInteger" error object for a non-integer number', () => {
    expect(validateWeeklyGoal(100.5, 1000)).toEqual({ isSuccess: false, msg: '주간 목표는 정수만 입력 가능합니다.' });
  });

  it('(AC-8) should return a "maxValue" error object for a value exceeding the maximum limit', () => {
    expect(validateWeeklyGoal(1001, 1000)).toEqual({ isSuccess: false, msg: '주간 목표값이 너무 큽니다.' });
  });
});
