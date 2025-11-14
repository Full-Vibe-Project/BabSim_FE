export type ValidationResult = { isSuccess: boolean; msg: string | null };

export function validateEmail(email: string): ValidationResult {
  if (!email) return { isSuccess: false, msg: "이메일을 입력해주세요." };
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email))
    return {
      isSuccess: false,
      msg: "유효한 이메일 형식이 아닙니다.",
    };
  return { isSuccess: true, msg: null };
}

export function validatePassword(pw: string, min = 8): ValidationResult {
  if (!pw) return { isSuccess: false, msg: "비밀번호를 입력해주세요." };
  if (pw.length < min)
    return {
      isSuccess: false,
      msg: `비밀번호는 ${min}자 이상이어야 합니다.`,
    };
  return { isSuccess: true, msg: null };
}

export function canEnableSubmit(email: string, pw: string): boolean {
  return validateEmail(email).isSuccess && validatePassword(pw).isSuccess;
}
