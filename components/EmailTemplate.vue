<template>
  <div class="dark w-72 md:w-full md:max-w-md pt-3 pb-5 rounded-lg border border-slate-200 bg-slate-900 text-slate-700">
    
    <!-- Background image -->
    <lazy-img
      class="mb-4 lg:mb-0 rounded-lg !absolute top-0 right-0 bg-slate-900"
      image-class="rounded-lg"
      :width="600"
      :height="500"
      url="/images/wireframe-hero-2.jpg"
      alt="Mailviews component"
    />

    <!-- Spacer -->
    <div class="w-full py-0 flex items-center relative">
      <span class="w-full h-px inset-x-11 absolute left-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600"></span>
      <span class="px-1.5 mx-auto relative z-10 rounded bg-slate-900 text-xs text-indigo-300">.max-w-sm</span>
    </div>
    
    <div class="px-4 relative z-10">

      <!-- Header -->
      <site-insignia 
        class="text-white"
        width="32"
      />

      <!-- Hero -->
      <div class="w-full">
        <div class="w-full h-full mt-28 mb-4 flex items-center text-center md:text-left font-bold text-xl text-white">
          <span class="mr-4">The future of work<br>is real-time</span>
          <span class="py-0.5 inline-flex items-center relative">
            <span class="w-1 h-1 block rounded-full bg-gradient-to-r bg-pink-500"></span>
            <span class="w-16 h-px inset-x-11 absolute left-0 bg-gradient-to-r from-pink-500 to-indigo-400"></span>
            <span class="px-1.5 ml-16 relative z-10 rounded bg-slate-900 font-light text-xs text-indigo-300">.mb-4.font-bold.text-xl<br>.text-white</span>
          </span>
        </div>

        <!-- Text -->
        <p class="mb-6 flex items-center text-center md:text-left text-sm text-slate-300">
          <span class="w-2/3">Responsive or hybrid? Mobile first or desktop first? Stay in control and code your emails however you like.</span>
          <span class="py-0.5 inline-flex items-center relative">
            <span class="w-1 h-1 block rounded-full bg-gradient-to-r bg-pink-500"></span>
            <span class="w-8 h-px inset-x-11 absolute left-0 bg-gradient-to-r from-pink-500 to-indigo-400"></span>
            <span class="px-1.5 ml-8 relative z-10 rounded bg-slate-900 font-light text-xs text-indigo-300">.mb-4<br>.text-base<br>.text-slate-400</span>
          </span>
        </p>

        <!-- Button -->
        <div class="flex">
          <span class="px-3 py-1.5 mr-4 inline-flex rounded md:ml-0 text-xs bg-teal-500 text-white">Discover</span>
          <span class="py-0.5 inline-flex items-center relative">
            <span class="w-1 h-1 block rounded-full bg-gradient-to-r bg-pink-500"></span>
            <span class="w-16 h-px inset-x-11 absolute left-0 bg-gradient-to-r from-pink-500 to-indigo-400"></span>
            <span class="px-1.5 ml-16 relative z-10 rounded bg-slate-900 font-light text-xs text-indigo-300">.px-3.py-1.5.rounded<br>.bg-teal-400.text-white</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmailTemplate',
}
</script>