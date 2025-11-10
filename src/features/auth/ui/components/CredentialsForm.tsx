"use client";

import React from "react";

type Props = {
  email: string;
  password: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
};

export default function CredentialsForm({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  isSubmitting = false,
}: Props) {
  const isValidEmail = /\S+@\S+\.\S+/.test(email);
  const isDisabled = !isValidEmail || password.length === 0 || isSubmitting;

  return (
    <form className="flex flex-col space-y-[18px]" onSubmit={onSubmit}>
      <div className="flex flex-col gap-[8px]">
        <label
          htmlFor="email"
          className="text-[13px] font-medium text-[#6E6A62]"
        >
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력하세요"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-[54px] rounded-[12px] border border-[#E7E3DA] bg-[#FAF8F3] px-4 text-[15px] text-[#2B2B2B] placeholder:text-[#B8B3AA] focus:outline-none focus:ring-2 focus:ring-[#D7D0C2]"
        />
      </div>

      <div className="flex flex-col gap-[8px]">
        <label
          htmlFor="password"
          className="text-[13px] font-medium text-[#6E6A62]"
        >
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-[54px] rounded-[12px] border border-[#E7E3DA] bg-[#FAF8F3] px-4 text-[15px] text-[#2B2B2B] placeholder:text-[#B8B3AA] focus:outline-none focus:ring-2 focus:ring-[#D7D0C2]"
        />
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="w-full h-[56px] text-[#fff] rounded-[14px] bg-sub text-white text-[15px] font-semibold hover:brightness-95 transition mt-[6px] border-none disabled:opacity-50"
      >
        {isSubmitting ? "로딩..." : "로그인"}
      </button>
    </form>
  );
}
