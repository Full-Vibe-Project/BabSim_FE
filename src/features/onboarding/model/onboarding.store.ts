import { create } from 'zustand';
import { OnboardingData } from './onboarding.schema';

type OnboardingState = {
  currentStep: number;
  data: Partial<OnboardingData>;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (data: Partial<OnboardingData>) => void;
};

const initialState: Partial<OnboardingData> = {
    name: '',
    gender: 'FEMALE',
    birthdate: '',
    height: 0,
    weight: 0,
    healthConditions: {
        allergies: [],
        chronicDiseases: [],
        dietPreferences: [],
    },
    goalType: 'DIET_MANAGEMENT',
    weeklyGoal: 0,
    exerciseCount: 0,
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  currentStep: 0,
  data: initialState,
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  updateData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
}));
