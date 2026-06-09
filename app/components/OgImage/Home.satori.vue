<template>
  <div style="position: relative; display: flex; width: 100%; height: 100%; background-color: #030712; font-family: 'Inter'">
    <!-- Perspective grid floor (1200x526) anchored to the bottom of the canvas -->
    <img
      src="/images/oggrid.jpg"
      style="position: absolute; left: 0; top: 104px; width: 1200px; height: 526px; object-fit: cover"
    >
    <!-- Solid block fading the top of the grid -->
    <div style="position: absolute; left: 0; top: 0; width: 1200px; height: 222px; background-color: #030712" />
    <!-- Gradient fading the bottom of the grid back into the background -->
    <div style="position: absolute; left: 0; top: 357px; width: 1200px; height: 273px; background: linear-gradient(to bottom, rgba(3,7,18,0) 12%, #030712 91%)" />

    <!-- Centered content -->
    <div style="position: absolute; left: 0; top: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 1200px; height: 630px; gap: 24px">
      <svg width="258" height="188" viewBox="0 0 251 184" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M241.919 31.566c0-12.409-10.06-22.469-22.47-22.469-12.409 0-22.469 10.06-22.469 22.47v119.836c0 12.41 10.06 22.469 22.469 22.469 12.41 0 22.47-10.059 22.47-22.469V31.566Z" stroke="url(#grad_a)" stroke-width="4" stroke-miterlimit="10"/>
        <path d="M147.921 31.566c0-12.409-10.06-22.469-22.469-22.469-12.41 0-22.47 10.06-22.47 22.47v119.836c0 12.41 10.06 22.469 22.47 22.469 12.409 0 22.469-10.059 22.469-22.469V31.566Z" stroke="url(#grad_b)" stroke-width="4" stroke-miterlimit="10"/>
        <path d="M237.154 45.388c7.647-9.773 5.923-23.895-3.85-31.542-9.774-7.647-23.896-5.923-31.543 3.85L107.932 137.62c-7.646 9.774-5.923 23.896 3.851 31.543 9.773 7.646 23.895 5.923 31.542-3.851l93.829-119.923Z" stroke="url(#grad_c)" stroke-width="4" stroke-miterlimit="10"/>
        <path d="M143.068 45.392c7.646-9.774 5.922-23.896-3.851-31.543-9.774-7.646-23.896-5.922-31.542 3.851l-93.83 119.923c-7.646 9.773-5.922 23.895 3.851 31.542 9.774 7.647 23.896 5.923 31.543-3.85l93.829-119.923Z" stroke="url(#grad_d)" stroke-width="4" stroke-miterlimit="10"/>
        <defs>
          <linearGradient id="grad_a" x1="219.449" y1="9.097" x2="219.449" y2="173.872" gradientUnits="userSpaceOnUse">
            <stop stop-color="#4F46E5"/><stop offset="1" stop-color="#9C96FF"/>
          </linearGradient>
          <linearGradient id="grad_b" x1="125.452" y1="9.097" x2="125.452" y2="173.872" gradientUnits="userSpaceOnUse">
            <stop stop-color="#4F46E5"/><stop offset="1" stop-color="#9C96FF"/>
          </linearGradient>
          <linearGradient id="grad_c" x1="233.304" y1="13.846" x2="111.783" y2="169.162" gradientUnits="userSpaceOnUse">
            <stop stop-color="#4F46E5"/><stop offset="1" stop-color="#9C96FF"/>
          </linearGradient>
          <linearGradient id="grad_d" x1="139.217" y1="13.85" x2="17.696" y2="169.165" gradientUnits="userSpaceOnUse">
            <stop stop-color="#4F46E5"/><stop offset="1" stop-color="#9C96FF"/>
          </linearGradient>
        </defs>
      </svg>

      <div style="display: flex; flex-direction: column; align-items: center; gap: 16px">
        <div style="display: flex; flex-direction: column; align-items: center; font-size: 60px; line-height: 1.1; color: #FFFFFF; text-align: center">
          <div style="display: flex">
            <span style="font-weight: 200">The&nbsp;</span><span style="font-weight: 700">modern email</span>
          </div>
          <div style="display: flex">
            <span style="font-weight: 200">development&nbsp;</span><span style="font-weight: 700">framework</span>
          </div>
        </div>
        <div style="display: flex; justify-content: center; width: 661px; font-size: 18px; line-height: 28px; color: #9CA3AF; text-align: center">
          Develop, preview and build production-ready emails in a modern environment, with Vue and Tailwind CSS.
        </div>
      </div>
    </div>
  </div>
</template>
