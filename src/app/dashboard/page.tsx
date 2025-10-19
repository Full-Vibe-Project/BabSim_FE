'use client';

import { useOnboardingStore } from '@/features/onboarding/model/onboarding.store';

export default function DashboardPage() {
  const { data } = useOnboardingStore();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{data.name}님, 환영합니다!</h1>
      <p>Your onboarding is complete.</p>
      <pre className="mt-4 bg-gray-100 p-4 rounded-md dark:bg-gray-800">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
