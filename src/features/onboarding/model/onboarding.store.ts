import { create } from 'zustand';
import { OnboardingData } from './onboarding.schema';

type OnboardingState = {
  currentStep: number;
  data: Partial<OnboardingData>;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (data: Partial<OnboardingData>) => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  currentStep: 0,
  data: {},
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  updateData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
}));
