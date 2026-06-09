<template>
  <ContainerAlt :bottom-border="false">
    <div class="pt-20 sm:pt-28 pb-10 px-4 sm:px-0 bg-background">
      <div class="max-w-2xl">
        <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">In production</p>
        <h2 class="mt-3 text-3xl sm:text-4xl/[1.15] font-bold text-foreground tracking-tight">
          <span class="font-light">Build</span> any kind <span class="font-light">of email.</span>
        </h2>
        <p class="mt-5 text-lg/7 text-muted-foreground text-balance">
          Maizzle is used by companies of all sizes to build HTML emails.
        </p>
      </div>
    </div>

    <div class="pb-8 px-4 sm:px-0 bg-background">
      <!-- mobile: simple 2-col masonry -->
      <div class="sm:hidden columns-2 gap-3">
        <div v-for="name in ['plugshare','riviera-motors','balmain','sneakerhead','pot-sa-ajut','green4ever','laravel','nuage']" :key="name" class="break-inside-avoid mb-3 rounded-lg overflow-hidden">
          <NuxtPicture :src="`/emails/${name}.jpg`" :alt="name" format="avif,webp" sizes="xs:50vw sm:25vw md:25vw lg:25vw xl:25vw" :img-attrs="{ class: 'block w-full', loading: 'lazy' }" />
        </div>
      </div>
      <!-- desktop: 4 explicit flex columns, fixed total height so bottom edges align -->
      <div class="hidden sm:flex gap-4 h-[896px]">
        <!-- Col 1: PlugShare natural ~252px + 188 = 440px -->
        <div class="flex-1 flex flex-col gap-4">
          <div class="h-[440px] rounded-lg overflow-hidden shrink-0">
            <NuxtPicture src="/emails/plugshare.jpg" alt="PlugShare" format="avif,webp" sizes="xs:50vw sm:25vw md:25vw lg:25vw xl:25vw" :img-attrs="{ class: 'block w-full', loading: 'lazy' }" />
          </div>
          <div class="flex-1 min-h-0 rounded-lg overflow-hidden">
            <NuxtPicture src="/emails/green4ever.jpg" alt="Green4ever" format="avif,webp" sizes="xs:50vw sm:25vw md:25vw lg:25vw xl:25vw" :img-attrs="{ class: 'block w-full', loading: 'lazy' }" />
          </div>
        </div>
        <!-- Col 2: Pot Sa Ajut natural ~274px + 188 = 462px -->
        <div class="flex-1 flex flex-col gap-4">
          <div class="h-[462px] rounded-lg overflow-hidden shrink-0">
            <NuxtPicture src="/emails/pot-sa-ajut.jpg" alt="Pot Sa Ajut" format="avif,webp" sizes="xs:50vw sm:25vw md:25vw lg:25vw xl:25vw" :img-attrs="{ class: 'block w-full', loading: 'lazy' }" />
          </div>
          <div class="flex-1 min-h-0 rounded-lg overflow-hidden">
            <NuxtPicture src="/emails/riviera-motors.jpg" alt="Riviera Motors" format="avif,webp" sizes="xs:50vw sm:25vw md:25vw lg:25vw xl:25vw" :img-attrs="{ class: 'block w-full', loading: 'lazy' }" />
          </div>
        </div>
        <!-- Col 3: Balmain natural ~309px + 188 = 497px -->
        <div class="flex-1 flex flex-col gap-4">
          <div class="h-[497px] rounded-lg overflow-hidden shrink-0">
            <NuxtPicture src="/emails/balmain.jpg" alt="Balmain" format="avif,webp" sizes="xs:50vw sm:25vw md:25vw lg:25vw xl:25vw" :img-attrs="{ class: 'block w-full', loading: 'lazy' }" />
          </div>
          <div class="flex-1 min-h-0 rounded-lg overflow-hidden">
            <NuxtPicture src="/emails/sneakerhead.jpg" alt="Sneakerhead" format="avif,webp" sizes="xs:50vw sm:25vw md:25vw lg:25vw xl:25vw" :img-attrs="{ class: 'block w-full', loading: 'lazy' }" />
          </div>
        </div>
        <!-- Col 4: Laravel natural ~360px + 188 = 548px -->
        <div class="flex-1 flex flex-col gap-4">
          <div class="h-[548px] rounded-lg overflow-hidden shrink-0">
            <NuxtPicture src="/emails/laravel.jpg" alt="Laravel News" format="avif,webp" sizes="xs:50vw sm:25vw md:25vw lg:25vw xl:25vw" :img-attrs="{ class: 'block w-full', loading: 'lazy' }" />
          </div>
          <div class="flex-1 min-h-0 rounded-lg overflow-hidden">
            <NuxtPicture src="/emails/nuage.jpg" alt="Nuage" format="avif,webp" sizes="xs:50vw sm:25vw md:25vw lg:25vw xl:25vw" :img-attrs="{ class: 'block w-full', loading: 'lazy' }" />
          </div>
        </div>
      </div>
    </div>
  </ContainerAlt>
</template>
