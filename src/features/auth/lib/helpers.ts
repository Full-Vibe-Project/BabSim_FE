export function buildLoginPayload(email: string, pw: string) {
  return {
    email: typeof email === "string" ? email.trim() : "",
    password: typeof pw === "string" ? pw.trim() : "",
  };
}

export function buildOAuthUrl(
  provider: "google" | "kakao",
  redirectUri: string,
  state?: string
): string | { isSuccess: false; msg: string } {
  if (!redirectUri) {
    return { isSuccess: false, msg: "redirect URI가 유효하지 않다." };
  }
  const params = new URLSearchParams({
    redirect_uri: redirectUri,
    response_type: "code",
  });
  if (state) params.append("state", state);

  let base = "";
  if (provider === "google") {
    base = "https://accounts.google.com/o/oauth2/v2/auth";
  } else if (provider === "kakao") {
    base = "https://kauth.kakao.com/oauth/authorize";
  }
  return `${base}?${params.toString()}`;
}
