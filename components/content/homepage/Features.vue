<template>
  <section id="features" class="py-20 md:pt-44 relative">
    <div class="w-full h-96 absolute top-0 left-0 z-0 block bg-gradient-to-b from-slate-50"></div>
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="px-6">
        <h3
          id="features-heading"
          class="mb-7 text-3xl md:text-4xl font-bold text-slate-800"
        >
          Maizzle
          <span class="text-indigo-600">Features</span>
        </h3>
        <div class="w-full grid grid-cols-1 md:grid-cols-3">
          <p class="mb-8 md:col-span-2 lg:col-span-1 text-slate-500">
            Customizable tools, crafted for email development.
          </p>
        </div>
      </div>
      <div
        class="pt-4 px-6 overflow-y-hidden"
        :class="{'pb-36' : showAllFeatures}"
      >
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
          :class="{'h-[650px]' : !showAllFeatures}"
        >
          <NuxtLink
            v-for="feature in features"
            :key="feature.path"
            :to="feature.path"
            class="group relative rounded-2xl ring-1 ring-slate-900/5 bg-white hover:ring-indigo-500 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <div class="px-6 py-5 rounded-lg relative z-1">
              <p class="mb-5 font-bold text-xl text-slate-700">
                {{ feature.title }}
              </p>
              <p
                class="text-base text-slate-500"
                v-html="feature.description"
              />
            </div>
          </NuxtLink>
        </div>
      </div>
      <div
        class="w-full px-6 flex items-end bottom-0 left-0 z-10 bg-gradient-to-t from-white"
        :class="{'h-44 sticky -mt-36' : showAllFeatures, 'h-96 absolute' : !showAllFeatures}"
      >
        <button
          type="button"
          class="py-2.5 mb-16 mx-auto inline-flex text-base bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white duration-300"
          :class="{'px-2.5 rounded-full duration-300 hover:rotate-180' : showAllFeatures, 'px-6 rounded-xl transition-colors' : !showAllFeatures}"
          @click="showFeatures"
        >
          <span v-show="!showAllFeatures">
            View all features
          </span>
          <span v-show="showAllFeatures">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
  import features from '@/data/features'

  const showAllFeatures = ref(false)
  const windowPosition = ref(0)

  const getYPosition = () => window.pageYOffset
  const setYPosition = amount => window.scrollTo({left: 0, top: amount, behavior: 'smooth'})

  const showFeatures = () => {
    if (!showAllFeatures.value) {
      windowPosition.value = getYPosition()
    } else {
      setYPosition(windowPosition.value)
    }

    showAllFeatures.value = !showAllFeatures.value
  }
</script>
