export const validateName = (name: string): { isSuccess: boolean; msg: string | null } => {
  if (!name) {
    return { isSuccess: false, msg: '이름은 필수 입력 항목입니다.' };
  }
  if (name.length > 30) {
    return { isSuccess: false, msg: '이름은 30자 이하로 입력해주세요.' };
  }
  if (/[^a-zA-Z가-힣\s]/.test(name)) {
    return { isSuccess: false, msg: '이름에는 특수문자나 숫자를 포함할 수 없습니다.' };
  }
  return { isSuccess: true, msg: null };
};

export const validateBirthdate = (birthdate: string): { isSuccess: boolean; msg: string | null } => {
  if (!/\d{4}-\d{2}-\d{2}/.test(birthdate)) {
    return { isSuccess: false, msg: '유효하지 않은 날짜 형식입니다.' };
  }

  const date = new Date(birthdate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (date.toString() === 'Invalid Date') {
    return { isSuccess: false, msg: '유효하지 않은 날짜 형식입니다.' };
  }

  const [year, month, day] = birthdate.split('-').map(Number);
  const dateFromParts = new Date(year, month - 1, day);

  if (dateFromParts.getFullYear() !== year || dateFromParts.getMonth() !== month - 1 || dateFromParts.getDate() !== day) {
    return { isSuccess: false, msg: '유효하지 않은 날짜 형식입니다.' };
  }

  if (date > today) {
    return { isSuccess: false, msg: '생년월일은 오늘보다 미래일 수 없습니다.' };
  }

  return { isSuccess: true, msg: null };
};

export const validateHeight = (height: number): { isSuccess: boolean; msg: string | null } => {
  if (height <= 0 || !Number.isInteger(height)) {
    return { isSuccess: false, msg: '유효한 키를 입력해주세요.' };
  }
  if (height > 1000) {
    return { isSuccess: false, msg: '키는 1000cm 이하로 입력해주세요.' };
  }
  return { isSuccess: true, msg: null };
};

export const validateWeight = (weight: number): { isSuccess: boolean; msg: string | null } => {
  if (weight <= 0) {
    return { isSuccess: false, msg: '유효한 몸무게를 입력해주세요.' };
  }
  if (weight > 1000) {
    return { isSuccess: false, msg: '몸무게는 1000kg 이하로 입력해주세요.' };
  }
  if (String(weight).includes('.') && String(weight).split('.')[1].length > 1) {
    return { isSuccess: false, msg: '유효한 몸무게를 입력해주세요.' };
  }
  return { isSuccess: true, msg: null };
};