"use client";

import React from "react";
import Link from "next/link";

export default function LoginFooter() {
  return (
    <div className="mt-[22px] text-center text-sm">
      <Link href="/forgot-password" className="text-[#7B6A54] hover:underline">
        비밀번호를 잊으셨나요?
      </Link>
      <div className="mt-[10px] text-[#8C877E]">
        계정이 없으신가요?{" "}
        <Link
          href="/signup"
          className="text-[#7B6A54] font-medium hover:underline."
        >
          회원가입
        </Link>
      </div>
    </div>
  );
}
