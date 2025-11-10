"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Login from "@/features/auth/ui/Login";

const queryClient = new QueryClient();

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (data: { email: string; password: string }) => {
    // 여기에서 실제 API 호출을 수행
    const { email, password } = data;
    if (email === "test@example.com" && password === "password123") {
      // 성공
      return { success: true };
    }
    // 실패
    return { success: false };
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full">
          <Login
            onSubmit={async (payload) => {
              const res = await handleSubmit(payload);
              if (res.success) {
                router.push("/dashboard");
              }
              return res;
            }}
          />
        </div>
      </div>
    </QueryClientProvider>
  );
}
