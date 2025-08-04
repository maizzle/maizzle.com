<template>
  <div class="pl-8 md:pl-12 pr-8 relative rounded-2xl overflow-hidden md:overflow-visible bg-slate-900">
    <PatternSubscribe class="absolute top-0 left-0 z-0 scale-150 md:scale-100 origin-top-left" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
      <div class="grid min-h-[550px] py-8 md:py-12 content-between">
        <div class="relative z-20">
          <MailviewsLogo />
        </div>
        <div>
          <p class="mb-7 text-3xl font-bold text-white">
            Get notified when we launch Mailviews.
          </p>
          <p class="mb-7 text-lg text-slate-400">
            100s of responsive HTML email components and templates, from the creators of Maizzle.
          </p>
          <form
             action="https://app.kit.com/forms/7290099/subscriptions"
             method="post"
          >
            <input
              name="email_address"
              type="email"
              autocomplete="email"
              placeholder="Your email..."
              required
              class="w-full px-6 mb-6 leading-10 border bg-slate-800 border-slate-600 rounded-md shadow-sm placeholder-slate-400 text-slate-200 appearance-none focus:outline-none focus:border-transparent focus:ring-2 ring-teal-300"
            >
            <button
              class="py-2.5 px-6 flex items-center self-start rounded-xl text-base bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-colors duration-300"
              type="submit"
            >
              <span class="mx-auto">Subscribe</span>
            </button>
          </form>
        </div>
      </div>
      <div class="h-[600px] pl-12 my-0 xl:-my-12 col-span-1 lg:col-span-2 hidden md:flex items-center">
        <div class="-mb-4 lg:mb-0 grid grid-cols-2 lg:grid-cols-3 gap-4 xl:absolute right-0">
          <div class="flex items-center">
            <div>
              <Image
                class="mb-4 lg:mb-0 rounded-lg bg-slate-100"
                :width="217"
                :height="355"
                url="/images/mailviews/card-1.jpg"
                alt="Mailviews component"
              />
              <Image
                class="block lg:hidden mb-4 rounded-lg bg-slate-100"
                :width="217"
                :height="303"
                url="/images/mailviews/card-5.jpg"
                alt="Mailviews component"
              />
            </div>
          </div>
          <div class="flex items-center">
            <div>
              <Image
                class="mb-4 rounded-lg bg-slate-100"
                :width="217"
                :height="181"
                url="/images/mailviews/card-4.jpg"
                alt="Mailviews component"
              />
              <Image
                class="mb-4 lg:mb-0 hidden md:block rounded-lg bg-slate-100"
                :width="217"
                :height="292"
                url="/images/mailviews/card-2.jpg"
                alt="Mailviews component"
              />
              <Image
                class="block lg:hidden rounded-lg bg-slate-100"
                :width="217"
                :height="329"
                url="/images/mailviews/card-3.jpg"
                alt="Mailviews component"
              />
            </div>
          </div>
          <div class="flex items-center">
            <div>
              <Image
                class="mb-4 hidden lg:block rounded-lg bg-slate-100"
                :width="217"
                :height="303"
                url="/images/mailviews/card-5.jpg"
                alt="Mailviews component"
              />
              <Image
                class="hidden lg:block rounded-lg bg-slate-100"
                :width="217"
                :height="329"
                url="/images/mailviews/card-3.jpg"
                alt="Mailviews component"
              />
            </div>
          </div>
          <div class="flex md:hidden items-center">
            <Image
              class="mb-4 rounded-lg bg-slate-100"
              :width="217"
              :height="292"
              url="/images/mailviews/card-2.jpg"
              alt="Mailviews component"
            />
          </div>
          <div class="flex md:hidden items-center">
            <Image
              class="rounded-lg bg-slate-100"
              :width="217"
              :height="329"
              url="/images/mailviews/card-3.jpg"
              alt="Mailviews component"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
