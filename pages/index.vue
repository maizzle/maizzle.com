<template>
  <div class="flex-1 relative -mt-[88px]">
    <Masthead />

    <Supercharge />

    <BYOHTML />

    <Environments />

    <Features />

    <Testimonials />

    <Mailviews />

    <HomeGuidesCards />

    <CraftingEmailsTemplates />

    <SiteFooter />
  </div>
</template>

<script setup>
  useContentHead({
    head: {
      titleTemplate: () => 'Maizzle - Quickly build HTML emails with Tailwind CSS',
    }
  })
</script>
