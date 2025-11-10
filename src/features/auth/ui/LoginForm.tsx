"use client";

import React, { useState } from "react";
import Image from "next/image";
import SocialButtons from "./components/SocialButtons";
import CredentialsForm from "./components/CredentialsForm";
import LoginFooter from "./components/LoginFooter";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateEmail(email)) {
      setError("유효한 이메일 형식이 아닙니다.");
      return;
    }

    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    // 간단한 모킹된 인증 로직 (테스트에서 사용)
    if (email === "test@example.com" && password === "password123") {
      setSuccess("환영합니다!");
      return;
    }

    // 인증 실패
    setError("이메일 또는 비밀번호가 올바르지 않습니다.");
  };

  return (
    <main className="min-h-screen w-full bg-bgc flex flex-col items-center justify-center px-6">
      {/* 로고 + 타이틀 */}
      <div className="text-center">
        <Image
          src="/logo.svg"
          alt="BabSim Logo"
          width={80}
          height={80}
          className="mx-auto"
        />
        <h1 className="mt-4 text-[28px] font-semibold text-[#2B2B2B]">
          BabSim
        </h1>
        <p className="mt-2 text-sm text-[#8F877B]">
          AI 기반 식단 및 건강 관리 서비스
        </p>
      </div>

      {/* 본문 컨테이너 */}
      <section className="w-full max-w-[560px] mt-8">
        {/* 소셜 로그인 버튼들 */}
        <SocialButtons
          onGoogle={() => alert("소셜 로그인은 데모입니다.")}
          onKakao={() => alert("소셜 로그인은 데모입니다.")}
        />

        {/* 구분선 */}
        <div className="flex items-center gap-4 my-[28px]">
          <span className="flex-1 h-px bg-[#E7E3DA]" />
          <span className="text-[12px] text-[#B6ADA1]">또는</span>
          <span className="flex-1 h-px bg-[#E7E3DA]" />
        </div>

        {/* 입력 폼 */}
        <CredentialsForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onSubmit={handleSubmit}
        />

        {/* 에러/성공 메시지 */}
        <div className="mt-4">
          {error && (
            <div role="alert" className="text-sm text-red-600">
              {error}
            </div>
          )}
          {success && <div className="text-sm text-green-600">{success}</div>}
        </div>

        <LoginFooter />
      </section>
    </main>
  );
}
