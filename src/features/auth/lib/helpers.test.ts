import { describe, it, expect } from "vitest";
import { buildLoginPayload, buildOAuthUrl } from "./helpers";

describe("buildLoginPayload", () => {
  it("should trim inputs and return { email, password }", () => {
    expect(buildLoginPayload("  a@b.com  ", "  secret  ")).toEqual({
      email: "a@b.com",
      password: "secret",
    });
  });
  it("should fallback to empty strings for nullish inputs", () => {
    expect(buildLoginPayload(null as any, undefined as any)).toEqual({
      email: "",
      password: "",
    });
  });
});

describe("buildOAuthUrl", () => {
  it("should build a valid Google OAuth URL with encoded query", () => {
    const url = buildOAuthUrl("google", "https://test.com/callback", "xyz");
    expect(url).toContain("https://accounts.google.com/o/oauth2/v2/auth?");
    expect(url).toContain("redirect_uri=https%3A%2F%2Ftest.com%2Fcallback");
    expect(url).toContain("response_type=code");
    expect(url).toContain("state=xyz");
  });
  it("should build a valid Kakao OAuth URL with encoded query", () => {
    const url = buildOAuthUrl("kakao", "https://test.com/callback", "abc");
    expect(url).toContain("https://kauth.kakao.com/oauth/authorize?");
    expect(url).toContain("redirect_uri=https%3A%2F%2Ftest.com%2Fcallback");
    expect(url).toContain("response_type=code");
    expect(url).toContain("state=abc");
  });
  it("should include state only when provided", () => {
    const url = buildOAuthUrl("google", "https://test.com/callback");
    expect(url).not.toContain("state=");
  });
  it("should return an error object for empty redirectUri", () => {
    expect(buildOAuthUrl("google", "")).toEqual({
      isSuccess: false,
      msg: "redirect URI가 유효하지 않다.",
    });
  });
});
