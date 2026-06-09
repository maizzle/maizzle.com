<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'

const welcomeVue = `<template>
  <Layout>
    <Container class="max-w-xl bg-white">
      <Section class="px-6 py-12">
        <Heading class="text-3xl sm:text-2xl font-bold text-gray-900">
          Build stunning emails, faster.
        </Heading>

        <Text class="m-0 mt-4 mb-6 text-base text-gray-600">
          Tailwind CSS, fine-tuned for every email client.
        </Text>

        <Button
          href="https://maizzle.com"
          class="px-5 py-3 text-sm rounded-lg bg-indigo-600 font-semibold text-white"
        >
          Read the docs
        </Button>
      </Section>
    </Container>
  </Layout>
</template>`

const distHtml = `<!DOCTYPE html>
<html lang="en" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <!--[if mso]>
      <style>
        td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
      </style>
    <![endif]-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" media="screen">
    <style>
      @media (max-width: 600px) {
        .sm-text-2xl {
          font-size: 24px !important;
          line-height: 32px !important;
        }
      }
    </style>
  </head>
  <body xml:lang="en" style="margin: 0; width: 100%; height: 100%; padding: 0; word-break: break-word;">
    <span style="display:none;">
      <!--[if mso]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          <w:WordDocument>
            <w:DontUseAdvancedTypographyReadingMail />
          </w:WordDocument>
        </xml>
      <![endif]-->
    </span>
    <div role="article" aria-roledescription="email" lang="en" dir="ltr" style="font-size: medium; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', Ubuntu, Cantarell, 'Helvetica Neue', sans-serif; font-size: max(16px, 1rem);">
      <!--[if mso]><table role="none" cellpadding="0" cellspacing="0" style="width: 576px" align="center"><tr><td style="background-color: #fffffe"><![endif]-->
      <div style="margin: 0 auto; max-width: 576px; background-color: #fffffe;">
        <!--[if mso]><table role="none" cellpadding="0" cellspacing="0" style="width: 100%"><tr><td style="padding: 48px 24px"><![endif]-->
        <div style="padding: 48px 24px;">
          <h1 class="sm-text-2xl" style="margin: 0; font-size: 30px; line-height: 36px; font-weight: 700; color: #111827;">Build stunning emails, faster.</h1>
          <p style="margin: 16px 0 24px; font-size: 16px; line-height: 24px; color: #4b5563;">Tailwind CSS, fine-tuned for every email client.</p>
          <div>
            <a style="display: inline-block; border-radius: 8px; background-color: #4f46e5; padding: 12px 20px; font-size: 14px; line-height: 20px; font-weight: 600; color: #fffffe; text-decoration: none;" href="https://maizzle.com">
              <!--[if mso]><i style="mso-font-width: 150%; mso-text-raise: 31px;" hidden>&emsp;</i><![endif]-->
              <span style="mso-text-raise: 16px;">Read the docs</span>
              <!--[if mso]><i style="mso-font-width: 150%;" hidden>&emsp;&#8203;</i><![endif]-->
            </a>
          </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
    </div>
  </body>
</html>`
</script>

<template>
  <ContainerAlt :bottom-border="false">
    <div class="pt-8 pb-10 px-4 sm:px-0 bg-background">
      <div class="max-w-2xl">
        <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Tailwind CSS</p>
        <h2 class="mt-3 text-3xl sm:text-4xl/[1.15] font-bold text-foreground tracking-tight">
          <span class="font-light">Style HTML</span> emails<br>with Tailwind <span class="font-light">CSS.</span>
        </h2>
        <p class="mt-5 text-lg/7 text-muted-foreground text-balance">
          Tailwind CSS is a first‑class citizen in Maizzle, finely‑tuned for email client compatibility.
        </p>
      </div>
    </div>

    <div class="pb-8 px-4 sm:px-0 bg-background">
      <div class="rounded-lg overflow-hidden border border-white/10 bg-[oklch(0.17_0.031_263)] grid lg:grid-cols-2">
        <!-- Source -->
        <div class="flex flex-col min-w-0 lg:h-[696px]">
          <div class="flex items-center h-9 pl-3 pr-2 bg-[oklch(0.13_0.031_263)] border-b border-white/5">
            <div class="flex items-center gap-1.5">
              <span class="size-3 rounded-full bg-white/45" />
              <span class="size-3 rounded-full bg-white/32" />
              <span class="size-3 rounded-full bg-white/20" />
            </div>
            <div class="flex-1 flex items-center justify-center">
              <span class="text-xs text-[#91889b]">emails/welcome.vue</span>
            </div>
            <div class="w-12" />
          </div>
          <ScrollArea class="flex-1 min-h-0 max-h-[300px] lg:max-h-none">
            <CodeSnippet :code="welcomeVue" lang="vue" />
          </ScrollArea>
        </div>

        <!-- Compiled output -->
        <div class="flex flex-col min-w-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:h-[696px]">
          <div class="flex items-center justify-center h-9 px-3 bg-[oklch(0.13_0.031_263)] border-b border-white/5">
            <span class="text-xs text-[#91889b]">dist/welcome.html</span>
          </div>
          <ScrollArea class="flex-1 min-h-0 max-h-[300px] lg:max-h-none">
            <CodeSnippet :code="distHtml" lang="html" />
          </ScrollArea>
        </div>
      </div>
    </div>
  </ContainerAlt>
</template>
