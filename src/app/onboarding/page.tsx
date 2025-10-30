'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Onboarding from '@/features/onboarding/ui/Onboarding';
import { useRouter } from 'next/navigation';

const queryClient = new QueryClient();

export default function OnboardingPage() {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log('Onboarding data submitted:', data);
    // TODO: 서버로 데이터 전송 로직 구현
    router.push('/dashboard');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">시작하기</h1>
        <Onboarding onSubmit={handleSubmit} />
      </div>
    </QueryClientProvider>
  );
}