Console Error

A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components

src/features/onboarding/ui/BasicInfoForm.tsx (31:15) @ Object.render


  29 |           render={({ field, fieldState: { error } }) => (
  30 |             <>
> 31 |               <input id="name" {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
     |               ^
  32 |               {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
  33 |             </>
  34 |           )}
Call Stack
57

Show 52 ignore-listed frame(s)
input
<anonymous>
Object.render
src/features/onboarding/ui/BasicInfoForm.tsx (31:15)
BasicInfoForm
src/features/onboarding/ui/BasicInfoForm.tsx (26:9)
Onboarding
src/features/onboarding/ui/Onboarding.tsx (63:9)
OnboardingPage
src/app/onboarding/page.tsx (22:9)