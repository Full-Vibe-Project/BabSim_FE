export type ValidationResult = { isSuccess: boolean; msg: string | null };

export function validateEmail(email: string): ValidationResult {
  if (!email) return { isSuccess: false, msg: "이메일은 필수 입력 항목이다." };
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email))
    return { isSuccess: false, msg: "유효한 이메일 형식을 입력해달라." };
  return { isSuccess: true, msg: null };
}

export function validatePassword(pw: string, min = 8): ValidationResult {
  if (!pw) return { isSuccess: false, msg: "비밀번호는 필수 입력 항목이다." };
  if (pw.length < min)
    return {
      isSuccess: false,
      msg: `비밀번호는 최소 ${min}자 이상이어야 한다.`,
    };
  return { isSuccess: true, msg: null };
}

export function canEnableSubmit(email: string, pw: string): boolean {
  return validateEmail(email).isSuccess && validatePassword(pw).isSuccess;
}
