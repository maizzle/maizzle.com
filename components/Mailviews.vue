<template>
  <div class="pl-8 md:pl-12 pr-8 relative rounded-2xl overflow-hidden md:overflow-visible bg-slate-900">
    <PatternSubscribe class="absolute top-0 left-0 z-0 scale-150 md:scale-100 origin-top-left" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
      <div
        class="grid min-h-[550px] py-8 md:py-12"
        :class="[subscribed ? 'content-none' : 'content-between']"
      >
        <div class="relative z-20">
          <MailviewsLogo />
        </div>
        <div>
          <p
            v-if="!subscribed"
            class="mb-7 text-3xl font-bold text-white"
          >Get notified when we launch Mailviews.</p>
          <div v-else class="space-y-4">
            <p class="text-3xl font-bold text-white">Awesome, please check your inbox and confirm your subscription.</p>
            <p class="text-lg text-slate-50">Tip: check your spam/junk folder if you don't see the email.</p>
          </div>
          <p
            v-if="!subscribed"
            class="mb-7 text-lg text-slate-400"
          >100s of responsive HTML email components and templates, from the creators of Maizzle.</p>
          <form
            v-if="!subscribed"
            @submit.prevent="handleFormSubmit"
          >
            <input
              v-if="!subscribed"
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="Your email..."
              required
              class="w-full px-6 mb-4 leading-10 border bg-slate-800 border-slate-600 rounded-md shadow-sm placeholder-slate-400 text-slate-200 appearance-none focus:outline-none focus:border-transparent focus:ring-2 ring-teal-300"
            >
            <div
              v-if="!subscribed"
              class="mb-4 relative flex items-center gap-4"
            >
              <input
                id="consent"
                v-model="consent"
                aria-describedby="consent-description"
                name="consent"
                type="checkbox"
                required
                class="checkbox opacity-0 absolute top-1 left-1 text-indigo-600 rounded border-slate-600 border-2 focus:outline-none"
              >
              <label
                for="consent"
                class="relative text-sm text-slate-500 cursor-pointer"
              >
                By subscribing I agree to the
                <NuxtLink
                  to="/privacy"
                  class="text-slate-500 underline rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >privacy policy</NuxtLink>.
              </label>
            </div>
            <button
              v-if="!subscribed"
              :disabled="submitDisabled"
              class="py-2.5 px-6 flex items-center self-start rounded-xl text-base bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-colors duration-300"
              :class="{ 'pointer-events-none': submitDisabled }"
              type="submit"
            >
              <span v-if="loading">
                <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              <span class="mx-auto">{{ loading ? 'Subscribing...' : 'Subscribe' }}</span>
            </button>
            <div v-if="subscribed">
              <p class="text-slate-50 text-sm">
                Awesome, please check your inbox and confirm your subscription.
              </p>
              <p class="text-slate-50 text-sm">
                Tip: check your spam/junk folder if you don't see the email.
              </p>
            </div>
            <div
              v-show="hasError"
              class="w-full mt-3 absolute text-sm text-rose-400"
            >
              {{ errorMessage }}
            </div>
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

<script setup>
const email = ref('')
const loading = ref(false)
const subscribed = ref(false)
const hasError = ref(false)
const errorMessage = ref('')
const consent = ref(false)

const submitDisabled = computed(() => {
  return loading.value ? true : false
})

async function handleFormSubmit() {
  loading.value = true
  hasError.value = false

  try {
    let formData = new URLSearchParams()

    formData.append('email', email.value)

    await $fetch('/api/subscribe', {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })

    loading.value = false
    subscribed.value = true
  } catch {
    errorMessage.value = 'Something went wrong, please try again later.'
  } finally {
    loading.value = false
  }
}
</script>
