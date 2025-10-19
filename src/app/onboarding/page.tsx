'use client';

import Onboarding from '@/features/onboarding/ui/Onboarding';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log('Onboarding data submitted:', data);
    // Here you would typically send the data to your server
    // For now, we'll just redirect to the dashboard
    router.push('/dashboard');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Onboarding</h1>
      <Onboarding onSubmit={handleSubmit} />
    </div>
  );
}