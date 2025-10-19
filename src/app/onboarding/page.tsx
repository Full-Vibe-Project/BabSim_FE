import BasicInfoForm from '@/features/onboarding/ui/BasicInfoForm';
import GoalSettingForm from '@/features/onboarding/ui/GoalSettingForm';
import HealthInfoForm from '@/features/onboarding/ui/HealthInfoForm';

export default function OnboardingPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Onboarding</h1>
      {/*<BasicInfoForm />*/}
      {/*<HealthInfoForm />*/}
      <GoalSettingForm />
    </div>
  );
}
