<template>
  <footer>
    <Container :bottom-border="false">
      <div class="relative overflow-hidden pt-16 sm:pt-30 pb-12 px-4 sm:px-0 bg-background">
        <LogoWordmark
          class="pointer-events-none select-none absolute inset-x-0 bottom-0 -mb-[2%] w-full h-auto text-foreground/[0.035]"
          aria-hidden="true"
        />
        <div class="relative">
          <FooterBody tight />
        </div>
      </div>
    </Container>
  </footer>
</template>
