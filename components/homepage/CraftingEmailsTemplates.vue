<template>
  <section id="ce-templates" class="relative mt-12 md:mt-24">
    <div class="max-w-7xl px-6 mx-auto relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        <div>
          <div class="lg:sticky top-28">
            <h3 class="mb-7 text-3xl md:text-4xl font-bold text-slate-800">
              <span class="text-indigo-600">Templates</span>
              by craftingemails
            </h3>
            <p class="mb-6 md:mb-12 text-slate-500">
              Kickstart your project with these email templates built by <em>craftingemails</em>.
            </p>
            <a
              href="https://craftingemails.com/email-templates"
              class="px-6 py-2.5 mb-6 md:mb-12 inline-flex rounded-xl text-base bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors"
            >
              View all templates
            </a>
          </div>
        </div>
        <div class="col-span-2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              v-for="(template, index) in templates"
              :key="template.title"
              class="flex"
              :class="{'row-span-2 items-center': index === 0}"
            >
              <a
                :href="template.url"
                class="grid-item relative focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <div class="frame w-full h-full p-[1px] rounded-[9px] absolute z-0 bg-white transition-all duration-300">
                  <div class="frame-inner w-full h-full rounded-lg absolute bg-white"></div>
                </div>
                <Image
                  class="rounded-2xl ring-1 ring-slate-900/5 bg-slate-100"
                  :width="384"
                  :height="287"
                  :url="template.image"
                  :alt="template.title"
                />
                <div class="py-4 flex items-end gap-2 rounded-lg relative z-10">
                  <h4 class="font-bold text-xl text-slate-700">{{ template.name }}</h4>
                  <p class="text-base text-slate-500">{{ template.purpose }}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  const templates = await queryContent('templates')
    .only([
      '_id',
      '_path',
      'date',
      'title',
      'name',
      'image',
      'url',
      'purpose',
    ])
    .sort({date: -1})
    .limit(3)
    .find()
</script>
