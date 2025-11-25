import { describe, it, expect } from "vitest";
import { validateEmail, validatePassword, canEnableSubmit } from "./validators";

describe("validateEmail", () => {
  it("should return success for a valid email", () => {
    expect(validateEmail("a@b.com")).toEqual({ isSuccess: true, msg: null });
  });
  it("should return 'required' error for empty email", () => {
    expect(validateEmail("")).toEqual({
      isSuccess: false,
      msg: "이메일을 입력해주세요.",
    });
  });
  it("should return 'invalid format' error for malformed email", () => {
    expect(validateEmail("abc@@")).toEqual({
      isSuccess: false,
      msg: "유효한 이메일 형식이 아닙니다.",
    });
    expect(validateEmail("abc")).toEqual({
      isSuccess: false,
      msg: "유효한 이메일 형식이 아닙니다.",
    });
  });
});

describe("validatePassword", () => {
  it("should return success for a password with length >= min", () => {
    expect(validatePassword("abcdefgh")).toEqual({
      isSuccess: true,
      msg: null,
    });
    expect(validatePassword("abcdefghij", 10)).toEqual({
      isSuccess: true,
      msg: null,
    });
  });
  it("should return 'required' error for empty password", () => {
    expect(validatePassword("")).toEqual({
      isSuccess: false,
      msg: "비밀번호를 입력해주세요.",
    });
  });
  it("should return 'minLength' error when shorter than min", () => {
    expect(validatePassword("abcde")).toEqual({
      isSuccess: false,
      msg: "비밀번호는 8자 이상이어야 합니다.",
    });
    expect(validatePassword("abcde", 10)).toEqual({
      isSuccess: false,
      msg: "비밀번호는 10자 이상이어야 합니다.",
    });
  });
});

describe("canEnableSubmit", () => {
  it("should return true only when both email and password validators succeed", () => {
    expect(canEnableSubmit("a@b.com", "abcdefgh")).toBe(true);
  });
  it("should return false when email is invalid", () => {
    expect(canEnableSubmit("abc", "abcdefgh")).toBe(false);
  });
  it("should return false when password is invalid", () => {
    expect(canEnableSubmit("a@b.com", "abc")).toBe(false);
  });
  it("should return false when both are invalid", () => {
    expect(canEnableSubmit("", "")).toBe(false);
  });
});
