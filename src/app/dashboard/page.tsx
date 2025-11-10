'use client';

import { useOnboardingStore } from '@/features/onboarding/model/onboarding.store';

export default function DashboardPage() {
  const { data } = useOnboardingStore();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{data.name}님, 환영합니다!</h1>
      <p>온보딩이 성공적으로 완료되었습니다.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">입력 정보:</h2>
      <pre className="mt-4 bg-gray-100 p-4 rounded-md dark:bg-gray-800">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
