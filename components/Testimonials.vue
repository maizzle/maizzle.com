<template>
  <div class="relative isolate bg-white pb-32 sm:pt-8">
    <PatternCode class="absolute top-0 -mt-36 md:-mt-64 w-full md:w-2/3 lg:w-1/2 right-0 sm:scale-[-1] -z-10 text-slate-300" />

    <div class="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-[0.15] blur-3xl" aria-hidden="true">
      <div class="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
    <div class="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-[0.15] blur-3xl sm:pt-40 xl:justify-end" aria-hidden="true">
      <div class="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-xl text-center">
        <h2 class="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Happy Campers</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What people say about Maizzle</p>
      </div>
      <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
        <figure class="col-span-2 hidden sm:block sm:rounded-2xl sm:bg-white sm:ring-1 sm:ring-gray-900/5 hover:ring-indigo-500 transition-all xl:col-start-2 xl:row-end-1">
          <a href="https://laravel-news.com" target="_blank" rel="noopener noreferrer">
            <blockquote class="p-12 text-xl font-semibold leading-8 tracking-tight text-gray-900">
              <p>“Maizzle is amazing! I use it for building all our emails, and being able to combine Tailwind with Maizzle's component system feels so modern and powerful. I can't imagine building email templates any other way.”</p>
            </blockquote>
            <figcaption class="flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4">
              <Image
                url="https://pbs.twimg.com/profile_images/1585701892163833877/TgI_EJnf_400x400.jpg"
                alt="Eric L. Barnes"
                :width="40"
                :height="40"
                class="h-10 w-10 rounded-full bg-gray-50"
              />
              <div class="flex-auto leading-normal">
                <div class="font-semibold">Eric L. Barnes</div>
                <div class="text-gray-600">@ericlbarnes</div>
              </div>
              <div class="flex items-center">
                <span class="sr-only">Laravel News</span>
                <svg class="w-8 h-8" fill="none" height="132" viewBox="0 0 134 132" width="134" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="a"><stop offset="0" stop-color="#fff"></stop><stop offset=".1217" stop-color="#fffbfb"></stop><stop offset=".241" stop-color="#fff0ef"></stop><stop offset=".3594" stop-color="#ffdedc"></stop><stop offset=".4773" stop-color="#ffc3c0"></stop><stop offset=".5948" stop-color="#ffa29c"></stop><stop offset=".7121" stop-color="#ff7970"></stop><stop offset=".8272" stop-color="#ff493e"></stop><stop offset=".8616" stop-color="#ff392d"></stop><stop offset="1" stop-color="#ff2d20"></stop></linearGradient><linearGradient id="b" gradientUnits="userSpaceOnUse" x1="27.8771" x2="86.7363" xlink:href="#a" y1="65.8138" y2="65.8138"></linearGradient><linearGradient id="c" gradientUnits="userSpaceOnUse" x1="54.7828" x2="54.7828" xlink:href="#a" y1="57.2727" y2="86.9087"></linearGradient><path d="m129.001 0h-124.22756c-2.20914 0-4.000002 1.79086-4.000002 4v123.628c0 2.209 1.790872 4 4.000012 4h124.22755c2.209 0 4-1.791 4-4v-123.628c0-2.20914-1.791-4-4-4z" fill="#ff2d20"></path><path d="m81.5414 89.0681h-42.8088v-56.1614h-10.8537v65.8141h9.0356 1.8181 47.9877z" fill="url(#b)"></path><path d="m105.894 32.9067h-10.3027v55.229l-30.0267-55.229h-15.8673v48.3734h10.1374v-37.7883l30.0268 55.229h16.0325z" fill="#fff"></path><path d="m59.8347 57.2583h-10.1374v29.6163h10.1374z" fill="url(#c)"></path></svg>
                <p class="font-display text-brand-500 ml-2 text-base font-bold leading-normal">
                Laravel News
                </p>
              </div>
            </figcaption>
          </a>
        </figure>
        <div class="space-y-8 xl:contents xl:space-y-0">
          <!-- Featured testimonial on mobile -->
          <figure class="rounded-2xl sm:hidden bg-white p-6 ring-1 ring-gray-900/5">
            <a href="https://laravel-news.com" target="_blank" rel="noopener noreferrer">
              <blockquote class="text-gray-900">
                <p>“Maizzle is amazing! I use it for building all our emails, and being able to combine Tailwind with Maizzle's component system feels so modern and powerful. I can't imagine building email templates any other way.”</p>
              </blockquote>
              <figcaption class="mt-6 flex items-center gap-x-4">
                <svg class="w-8 h-8" fill="none" height="132" viewBox="0 0 134 132" width="134" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="a"><stop offset="0" stop-color="#fff"></stop><stop offset=".1217" stop-color="#fffbfb"></stop><stop offset=".241" stop-color="#fff0ef"></stop><stop offset=".3594" stop-color="#ffdedc"></stop><stop offset=".4773" stop-color="#ffc3c0"></stop><stop offset=".5948" stop-color="#ffa29c"></stop><stop offset=".7121" stop-color="#ff7970"></stop><stop offset=".8272" stop-color="#ff493e"></stop><stop offset=".8616" stop-color="#ff392d"></stop><stop offset="1" stop-color="#ff2d20"></stop></linearGradient><linearGradient id="b" gradientUnits="userSpaceOnUse" x1="27.8771" x2="86.7363" xlink:href="#a" y1="65.8138" y2="65.8138"></linearGradient><linearGradient id="c" gradientUnits="userSpaceOnUse" x1="54.7828" x2="54.7828" xlink:href="#a" y1="57.2727" y2="86.9087"></linearGradient><path d="m129.001 0h-124.22756c-2.20914 0-4.000002 1.79086-4.000002 4v123.628c0 2.209 1.790872 4 4.000012 4h124.22755c2.209 0 4-1.791 4-4v-123.628c0-2.20914-1.791-4-4-4z" fill="#ff2d20"></path><path d="m81.5414 89.0681h-42.8088v-56.1614h-10.8537v65.8141h9.0356 1.8181 47.9877z" fill="url(#b)"></path><path d="m105.894 32.9067h-10.3027v55.229l-30.0267-55.229h-15.8673v48.3734h10.1374v-37.7883l30.0268 55.229h16.0325z" fill="#fff"></path><path d="m59.8347 57.2583h-10.1374v29.6163h10.1374z" fill="url(#c)"></path></svg>
                <div class="leading-normal">
                  <div class="font-semibold">Eric L. Barnes</div>
                  <div class="text-gray-600">Laravel News</div>
                </div>
              </figcaption>
            </a>
          </figure>
          <div class="space-y-8 gap-y-8 xl:row-span-2">
            <figure class="rounded-2xl bg-white ring-1 ring-gray-900/5 hover:ring-indigo-500 transition-all">
              <a href="https://twitter.com/tobias_petry" target="_blank" rel="noopener noreferrer" class="block p-6">
                <blockquote class="text-gray-900">
                  <p>“I can finally build emails in a modern way with Maizzle. The power of Tailwind combined with Maizzle components finally enables me to create a re-usable design system for mails.”</p>
                </blockquote>
                <figcaption class="mt-6">
                  <a href="https://twitter.com/tobias_petry" target="_blank" class="flex items-center gap-x-4">
                    <Image
                      url="https://pbs.twimg.com/profile_images/1618512474432569345/-ExL_vDn_400x400.jpg"
                      alt="Tobias Petry"
                      :width="40"
                      :height="40"
                      class="h-10 w-10 rounded-full bg-gray-50"
                    />
                    <div class="leading-normal">
                      <div class="font-semibold">Tobias Petry</div>
                      <div class="text-gray-600">@tobias_petry</div>
                    </div>
                  </a>
                </figcaption>
              </a>
            </figure>

            <!-- More testimonials... -->
          </div>
          <div class="space-y-8 xl:row-start-1">
            <figure class="rounded-2xl bg-white ring-1 ring-gray-900/5 hover:ring-indigo-500 transition-all">
              <a href="https://foundartists.com/" target="_blank" rel="noopener noreferrer" class="block p-6">
                <blockquote class="text-gray-900">
                  <p>“Maizzle allows us to produce better, more consistent emails, in less time and without any of the typical nasty black-box 'magic' that often plagues other frameworks.”</p>
                </blockquote>
                <figcaption class="mt-6 flex items-center gap-x-4">
                  <svg viewBox="0 0 72 72" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ff0089" d="M0 0h72v72H0z"></path>
                    <path fill="#fff" d="M21.8 17.8h28.4v7.3H30v7.7h17.8v7.3H30v14.1h-8.2z"></path>
                  </svg>
                  <div class="leading-normal">
                    <div class="font-semibold">Michael Warning</div>
                    <div class="text-gray-600">Found</div>
                  </div>
                </figcaption>
              </a>
            </figure>

            <!-- More testimonials... -->
          </div>
        </div>
        <div class="space-y-8 xl:contents xl:space-y-0">
          <div class="space-y-8 xl:row-start-1">
            <figure class="rounded-2xl bg-white ring-1 ring-gray-900/5 hover:ring-indigo-500 transition-all">
              <a href="https://www.tedgoas.com/" target="_blank" rel="noopener noreferrer" class="p-6 block">
                <blockquote class="text-gray-900">
                  <p>“Maizzle is a 💯 option for building properly-rendering email code using modern web technologies like Tailwind CSS, static site generators, and JavaScript.”</p>
                </blockquote>
                <figcaption class="mt-6 flex items-center gap-x-4">
                  <svg class="simple-logo" width="29" height="22" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 22" fill="none" data-title="Dialpad">
                    <path d="M21.1355 3.81281C19.4319 3.81113 17.7852 4.43774 16.4989 5.57712C15.2126 6.7165 14.3735 8.29182 14.1363 10.0126V0.108626C14.1364 0.0869409 14.1301 0.0657361 14.1182 0.0477565C14.1063 0.029777 14.0894 0.0158506 14.0697 0.00778021C14.05 -0.000290209 14.0283 -0.00213304 14.0075 0.00249027C13.9868 0.00711357 13.9678 0.0179901 13.9532 0.033712L9.81917 4.37782C8.94818 4.00357 8.01241 3.81144 7.06729 3.81281C3.16599 3.81281 0 7.0305 0 11C0 14.9696 3.16422 18.1873 7.06817 18.1873C8.77163 18.189 10.4183 17.5625 11.7045 16.4233C12.9908 15.2841 13.83 13.709 14.0673 11.9884V21.8914C14.0673 21.9889 14.1832 22.0359 14.2496 21.9664L18.3845 17.6223C19.2552 17.9964 20.1907 18.1885 21.1355 18.1873C25.0386 18.1873 28.2028 14.9696 28.2028 11C28.2028 7.0305 25.0386 3.81281 21.1355 3.81281Z" fill="#7C52FF"></path>
                  </svg>
                  <div class="leading-normal">
                    <div class="font-semibold">Ted Goas</div>
                    <div class="text-gray-600">Dialpad</div>
                  </div>
                </figcaption>
              </a>
            </figure>

            <!-- More testimonials... -->
          </div>
          <div class="space-y-8 xl:row-span-2">
            <figure class="rounded-2xl bg-white ring-1 ring-gray-900/5 hover:ring-indigo-500 transition-all">
              <a href="https://www.tilt-studio.fr/" target="_blank" rel="noopener noreferrer" class="block p-6">
                <blockquote class="text-gray-900">
                  <p>“Maizzle lets me structure my code the way I want to while helping me automate things like links tracking or styles inlining. I love being able to easily generate a version for local development and one properly packed to deliver to clients.”</p>
                </blockquote>
                <figcaption class="mt-6 flex items-center gap-x-4">
                  <svg viewBox="0 0 28 32" width="28" height="32" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#9bc947" d="M14 31.8c0-7.5-4.8-6.5-9.7-10.7C-1.1 16.5-1 6.7 4.3 3S18.5-.8 23.8 3s5.4 13.6 0 18.2c-4.9 4.1-9.7 3.2-9.7 10.7" />
                    <path d="M21.7 4.7C17.4 1.5 10.4 1.5 6 4.7c-2.2 1.6-3.3 4.5-3.3 7.5-.1 2.9 1.1 5.8 3.3 7.5 4.3 3.2 11.3 3.2 15.7 0 2.2-1.6 3.3-4.5 3.3-7.5.1-2.9-1-5.8-3.3-7.5z" fill="#fff" />
                    <path fill="#9bc947" d="M14.9 5.8c-.1.8-.5 1.6-1.1 2.2-.6-.6-1-1.3-1.1-2.2.1-.8.5-1.6 1.1-2.2.6.6 1 1.4 1.1 2.2zm0 12.8c-.1.8-.5 1.6-1.1 2.2-.6-.6-1-1.3-1.1-2.2.1-.8.5-1.6 1.1-2.2.6.6 1 1.4 1.1 2.2z" />
                    <path d="M7.4 11.2c.8.1 1.6.5 2.2 1.1-.6.6-1.3 1-2.2 1.1-.8-.1-1.6-.5-2.2-1.1.6-.7 1.4-1.1 2.2-1.1zm12.9 0c.8.1 1.6.5 2.2 1.1-.6.6-1.3 1-2.2 1.1-.8-.1-1.6-.5-2.2-1.1.6-.7 1.3-1.1 2.2-1.1z" fill="#b3d143" />
                    <path fill="#9bc947" d="M7.4 11.2c.8.1 1.6.5 2.2 1.1-.6.6-1.3 1-2.2 1.1-.8-.1-1.6-.5-2.2-1.1.6-.7 1.4-1.1 2.2-1.1zm12.9 0c.8.1 1.6.5 2.2 1.1-.6.6-1.3 1-2.2 1.1-.8-.1-1.6-.5-2.2-1.1.6-.7 1.3-1.1 2.2-1.1zM8.5 16c.6-.5 1.5-.8 2.3-.8 0 .8-.2 1.6-.8 2.3-.6.5-1.5.8-2.3.8 0-.8.3-1.7.8-2.3zm9.1-9.1c.6-.5 1.5-.8 2.3-.8 0 .8-.2 1.6-.8 2.3-.6.5-1.5.8-2.3.8 0-.8.3-1.6.8-2.3zm0 10.6c-.5-.6-.8-1.5-.8-2.3.8 0 1.6.2 2.3.8.5.6.8 1.5.8 2.3-.8 0-1.6-.3-2.3-.8zM8.5 8.4C8 7.8 7.7 7 7.7 6.1c.8 0 1.6.2 2.3.8.5.6.8 1.5.8 2.3-.8 0-1.6-.3-2.3-.8zm8.2 4c0 1.4-1.3 2.5-2.9 2.5s-2.9-1.1-2.9-2.5.6-2.9 2.9-2.9 2.9 1.5 2.9 2.9z" />
                  </svg>
                  <div class="leading-normal">
                    <div class="font-semibold">Rémi Parmentier</div>
                    <div class="text-gray-600">Tilt Studio</div>
                  </div>
                </figcaption>
              </a>
            </figure>

            <!-- More testimonials... -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
