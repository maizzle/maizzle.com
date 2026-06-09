<script setup lang="ts">
import AutoScroll from 'embla-carousel-auto-scroll'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

const platforms: { name: string; src: string; imgClass?: string }[] = [
  { name: 'Resend',         src: '/logo/send/resend.svg' },
  { name: 'SendGrid',       src: '/logo/send/sendgrid.svg', imgClass: 'max-h-12 max-w-[180px]' },
  { name: 'Mailgun',        src: '/logo/send/mailgun.svg' },
  { name: 'Postmark',       src: '/logo/send/postmark.svg' },
  { name: 'Amazon SES',     src: '/logo/send/aws.svg' },
  { name: 'Mailchimp',      src: '/logo/send/mailchimp.svg' },
  { name: 'Brevo',          src: '/logo/send/brevo.svg' },
  { name: 'Loops',          src: '/logo/send/loops.svg' },
  { name: 'Customer.io',    src: '/logo/send/customerio.svg' },
  { name: 'Nodemailer',     src: '/logo/send/nodemailer.svg', imgClass: 'max-h-12 max-w-[180px]' },
  { name: 'Mailtrap',       src: '/logo/send/mailtrap.svg' },
  { name: 'Klaviyo',        src: '/logo/send/klaviyo.svg' },
  { name: 'HubSpot',        src: '/logo/send/hubspot.svg' },
  { name: 'ActiveCampaign', src: '/logo/send/activecampaign.svg', imgClass: 'max-h-12 max-w-[180px]' },
  { name: 'Braze',          src: '/logo/send/braze.svg' },
]

const row1 = platforms.slice(0, 8)
const row2 = platforms.slice(8)

const row1Loop = [...row1, ...row1, ...row1]
const row2Loop = [...row2, ...row2, ...row2, ...row2]

// Swap the second looped Nodemailer for Resend, for variety in the repeated row.
const nodemailerIdx = row2Loop
  .map((p, i) => (p.name === 'Nodemailer' ? i : -1))
  .filter(i => i >= 0)
if (nodemailerIdx[1] !== undefined) row2Loop[nodemailerIdx[1]] = platforms[0]!

// Reduced-motion: never start the auto-scroll (logos stay, just static). The
// carousels render client-only, so this is evaluated in the browser; gating
// playOnInit also survives embla reInits (lazy logo loads) without restarting.
const prefersReduced = import.meta.client
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches
</script>

<template>
  <ContainerAlt :bottom-border="false">
    <div class="pt-20 sm:pt-28 pb-10 px-4 sm:px-0 bg-background">
      <div class="max-w-2xl">
        <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Deploy</p>
        <h2 class="mt-3 text-3xl sm:text-4xl/[1.15] font-bold text-foreground tracking-tight">
          <span class="font-light">Send with</span> any platform.
        </h2>
        <p class="mt-5 text-lg/7 text-muted-foreground text-balance">
          Maizzle compiles your emails to pure HTML, so you can use any email service provider.
        </p>
      </div>
    </div>

    <div class="pb-8 sm:-mx-10 flex flex-col gap-4 overflow-hidden">
      <ClientOnly>
        <!-- Reduced-motion: the marquees sit frozen, so offset the rows in
             opposite directions for a brickwork stagger. -->
        <Carousel
          class="w-full"
          :opts="{ loop: true, align: 'start', dragFree: true }"
          :plugins="[AutoScroll({ playOnInit: !prefersReduced, speed: 0.8, stopOnInteraction: false, stopOnMouseEnter: false, stopOnPointerDown: false })]"
        >
          <CarouselContent :class="prefersReduced ? '-ml-12' : '-ml-0'">
            <CarouselItem
              v-for="(p, i) in row1Loop"
              :key="`r1-${i}-${p.name}`"
              class="pl-0 basis-auto"
            >
              <div class="mr-4 flex items-center justify-center h-16 px-8 min-w-44 rounded-lg border border-border bg-muted/30">
                <img
                  :src="p.src"
                  :alt="p.name"
                  :class="p.imgClass ?? 'max-h-7 max-w-[120px]'"
                  class="object-contain dark:[filter:brightness(0)_invert(0.85)]"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        <Carousel
          class="w-full"
          :opts="{ loop: true, align: 'start', dragFree: true }"
          :plugins="[AutoScroll({ playOnInit: !prefersReduced, speed: 0.6, direction: 'backward', stopOnInteraction: false, stopOnMouseEnter: false, stopOnPointerDown: false })]"
        >
          <CarouselContent :class="prefersReduced ? '-ml-36' : '-ml-0'">
            <CarouselItem
              v-for="(p, i) in row2Loop"
              :key="`r2-${i}-${p.name}`"
              class="pl-0 basis-auto"
            >
              <div class="mr-4 flex items-center justify-center h-16 px-8 min-w-44 rounded-lg border border-border bg-muted/30">
                <img
                  :src="p.src"
                  :alt="p.name"
                  :class="p.imgClass ?? 'max-h-7 max-w-[120px]'"
                  class="object-contain dark:[filter:brightness(0)_invert(0.85)]"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </ClientOnly>
    </div>
  </ContainerAlt>
</template>
