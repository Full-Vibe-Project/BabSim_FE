### 1번 에러

In HTML, <form> cannot be a descendant of <form>.
This will cause a hydration error.

See more info here: https://nextjs.org/docs/messages/react-hydration-error


...
    <HTTPAccessFallbackBoundary notFound={undefined} forbidden={undefined} unauthorized={undefined}>
      <RedirectBoundary>
        <RedirectErrorBoundary router={{...}}>
          <InnerLayoutRouter url="/onboarding" tree={[...]} cacheNode={{lazyData:null, ...}} segmentPath={[...]}>
            <SegmentViewNode type="page" pagePath="onboarding...">
              <SegmentTrieNode>
              <ClientPageRoot Component={function OnboardingPage} searchParams={{}} params={{}}>
                <OnboardingPage params={Promise} searchParams={Promise}>
                  <QueryClientProvider client={{}}>
                    <div className="p-4 max-w-...">
                      <h1>
                      <Onboarding onSubmit={function handleSubmit}>
                        <FormProvider control={{...}} subscribe={function subscribe} trigger={function trigger} ...>
>                         <form onSubmit={function}>
                            <BasicInfoForm>
>                             <form
>                               onSubmit={function}
>                               className="space-y-6 max-w-md mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg ..."
>                             >
                            ...
            ...
          ...
src/features/onboarding/ui/BasicInfoForm.tsx (81:5) @ BasicInfoForm


  79 |
  80 |   return (
> 81 |     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
     |     ^
  82 |       <div className="space-y-2">
  83 |         <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">이름</label>
  84 |         <Controller
Call Stack
17

Show 13 ignore-listed frame(s)
form
<anonymous>
BasicInfoForm
src/features/onboarding/ui/BasicInfoForm.tsx (81:5)
Onboarding
src/features/onboarding/ui/Onboarding.tsx (63:9)
OnboardingPage
src/app/onboarding/page.tsx (22:9)

### 2번 에러

<form> cannot contain a nested <form>.
See this log for the ancestor stack trace.

src/features/onboarding/ui/Onboarding.tsx (62:7) @ Onboarding


  60 |   return (
  61 |     <FormProvider {...methods}>
> 62 |       <form onSubmit={methods.handleSubmit((data) => mutation.mutate(data))}>
     |       ^
  63 |         <CurrentFormComponent />
  64 |         <div className="mt-8 flex justify-between">
  65 |           {currentStep > 0 && (
Call Stack
18

Show 15 ignore-listed frame(s)
form
<anonymous>
Onboarding
src/features/onboarding/ui/Onboarding.tsx (62:7)
OnboardingPage
src/app/onboarding/page.tsx (22:9)

### 3번 에러

Recoverable Error

Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

See more info here: https://nextjs.org/docs/messages/react-hydration-error

src/features/onboarding/ui/BasicInfoForm.tsx (81:5) @ BasicInfoForm


  79 |
  80 |   return (
> 81 |     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
     |     ^
  82 |       <div className="space-y-2">
  83 |         <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">이름</label>
  84 |         <Controller
Call Stack
15

Show 11 ignore-listed frame(s)
form
<anonymous>
BasicInfoForm
src/features/onboarding/ui/BasicInfoForm.tsx (81:5)
Onboarding
src/features/onboarding/ui/Onboarding.tsx (63:9)
OnboardingPage
src/app/onboarding/page.tsx (22:9)
