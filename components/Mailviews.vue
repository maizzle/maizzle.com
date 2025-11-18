<template>
  <div class="pl-8 md:pl-12 pr-8 relative rounded-2xl overflow-hidden md:overflow-visible bg-slate-900 selection:bg-white selection:text-gray-950">
    <PatternSubscribe class="absolute top-0 left-0 z-0 scale-150 md:scale-100 origin-top-left" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
      <div class="grid min-h-[550px] py-8 md:py-12 content-around">
        <div class="relative z-20">
          <MailviewsLogo />
        </div>
        <div>
          <p class="mb-7 text-3xl font-bold text-white">
            Build stunning emails in less time with modular HTML components.
          </p>
          <p class="mb-7 text-lg text-slate-400">
            A vast collection of super high quality, production-ready Tailwind CSS email templates and components that help you quickly build HTML emails.
          </p>
        </div>
        <a
          href="https://mailviews.com"
          target="_blank"
          class="py-2.5 px-6 flex grow-0 justify-self-start items-center rounded-xl text-base bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-colors duration-300"
        >
          Visit Mailviews
        </a>
      </div>
      <div class="h-80 col-span-1 lg:col-span-2 hidden md:grid justify-end">
        <div class="grid grid-cols-3 gap-4 items-center -mt-24">
          <div class="grid gap-4 *:rounded *:shadow-xl">
            <img src="/images/mailviews/mailviews-card-1.jpg" alt="" loading="lazy" width="218">
            <img src="/images/mailviews/mailviews-card-2.jpg" alt="" loading="lazy" width="218">
            <img src="/images/mailviews/mailviews-card-3.jpg" alt="" loading="lazy" width="218">
          </div>
          <div class="grid gap-4 *:rounded *:shadow-lg">
            <img src="/images/mailviews/mailviews-card-4.jpg" alt="" loading="lazy" width="218">
            <img src="/images/mailviews/mailviews-card-5.jpg" alt="" loading="lazy" width="218">
            <img src="/images/mailviews/mailviews-card-6.jpg" alt="" loading="lazy" width="218">
          </div>
          <div class="grid gap-4 *:rounded *:shadow-lg">
            <img src="/images/mailviews/mailviews-card-7.jpg" alt="" loading="lazy" width="218">
            <img src="/images/mailviews/mailviews-card-8.jpg" alt="" loading="lazy" width="218">
            <img src="/images/mailviews/mailviews-card-9.jpg" alt="" loading="lazy" width="218">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
