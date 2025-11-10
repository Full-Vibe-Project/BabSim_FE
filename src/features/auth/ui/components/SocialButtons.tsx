"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

type Props = {
  onGoogle?: () => void;
  onKakao?: () => void;
};

export default function SocialButtons({ onGoogle, onKakao }: Props) {
  return (
    <div className="flex flex-col space-y-[12px]">
      <button
        type="button"
        aria-label="google"
        className="w-full h-[56px] rounded-[14px] bg-white border border-[#E7E3DA] text-[#2B2B2B] text-[15px] font-medium hover:bg-[#FAF8F3] transition flex items-center justify-center gap-2"
        onClick={onGoogle}
      >
        <FcGoogle size={24} />
        <span>Google로 계속하기</span>
      </button>

      <button
        type="button"
        aria-label="kakao"
        className="w-full h-[56px] rounded-[14px] bg-[#FEE500] text-[#191600] text-[15px] font-medium hover:brightness-95 transition flex items-center justify-center gap-2 border-none"
        onClick={onKakao}
      >
        <RiKakaoTalkFill size={24} />
        <span>카카오톡으로 계속하기</span>
      </button>
    </div>
  );
}
