import { describe, it, expect } from 'vitest';
import { validateName, validateBirthdate, validateHeight, validateWeight } from './basicInfoValidators';

describe('validateName', () => {
  it('should return a success object for a valid name', () => {
    expect(validateName('홍길동')).toEqual({ isSuccess: true, msg: null });
    expect(validateName('John Doe')).toEqual({ isSuccess: true, msg: null });
  });

  it('should return a "required" error object for an empty name', () => {
    expect(validateName('')).toEqual({ isSuccess: false, msg: '이름은 필수 입력 항목입니다.' });
  });

  it('should return a "maxLength" error object for a name longer than 30 characters', () => {
    const longName = 'a'.repeat(31);
    expect(validateName(longName)).toEqual({ isSuccess: false, msg: '이름은 30자 이하로 입력해주세요.' });
  });

  it('should return an "invalidChars" error object for a name with special characters', () => {
    expect(validateName('홍길동!')).toEqual({ isSuccess: false, msg: '이름에는 특수문자나 숫자를 포함할 수 없습니다.' });
    expect(validateName('John123')).toEqual({ isSuccess: false, msg: '이름에는 특수문자나 숫자를 포함할 수 없습니다.' });
  });
});

describe('validateBirthdate', () => {
  it('should return a success object for a valid date in the past', () => {
    expect(validateBirthdate('2000-01-01')).toEqual({ isSuccess: true, msg: null });
  });

  it('should return a "futureDate" error object for a date in the future', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const futureDate = tomorrow.toISOString().split('T')[0];
    expect(validateBirthdate(futureDate)).toEqual({ isSuccess: false, msg: '생년월일은 오늘보다 미래일 수 없습니다.' });
  });

  it('should return an "invalidFormat" error object for a non-existent date like "2025-02-30"', () => {
    expect(validateBirthdate('2025-02-30')).toEqual({ isSuccess: false, msg: '유효하지 않은 날짜 형식입니다.' });
  });

  it('should return an "invalidFormat" error object for a non-date string', () => {
    expect(validateBirthdate('not-a-date')).toEqual({ isSuccess: false, msg: '유효하지 않은 날짜 형식입니다.' });
  });
});

describe('validateHeight', () => {
  it('should return a success object for a valid height', () => {
    expect(validateHeight(170)).toEqual({ isSuccess: true, msg: null });
  });

  it('should return a "maxValue" error object for a height greater than 1000', () => {
    expect(validateHeight(1001)).toEqual({ isSuccess: false, msg: '키는 1000cm 이하로 입력해주세요.' });
  });

  it('should return an "invalid" error object for zero or a negative height', () => {
    expect(validateHeight(0)).toEqual({ isSuccess: false, msg: '유효한 키를 입력해주세요.' });
    expect(validateHeight(-10)).toEqual({ isSuccess: false, msg: '유효한 키를 입력해주세요.' });
  });

  it('should return an "invalid" error object for a non-integer height', () => {
    expect(validateHeight(170.5)).toEqual({ isSuccess: false, msg: '유효한 키를 입력해주세요.' });
  });
});

describe('validateWeight', () => {
  it('should return a success object for a valid weight including one decimal place', () => {
    expect(validateWeight(70)).toEqual({ isSuccess: true, msg: null });
    expect(validateWeight(70.5)).toEqual({ isSuccess: true, msg: null });
  });

  it('should return a "maxValue" error object for a weight greater than 1000', () => {
    expect(validateWeight(1000.1)).toEqual({ isSuccess: false, msg: '몸무게는 1000kg 이하로 입력해주세요.' });
  });

  it('should return an "invalid" error object for zero or a negative weight', () => {
    expect(validateWeight(0)).toEqual({ isSuccess: false, msg: '유효한 몸무게를 입력해주세요.' });
    expect(validateWeight(-10)).toEqual({ isSuccess: false, msg: '유효한 몸무게를 입력해주세요.' });
  });

  it('should return an "invalid" error object for a weight with more than one decimal place', () => {
    expect(validateWeight(70.55)).toEqual({ isSuccess: false, msg: '유효한 몸무게를 입력해주세요.' });
  });
});
