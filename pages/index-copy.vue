<template>
  <div
    class="relative flex flex-col min-h-screen overflow-hidden bg-white visual-effects dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-700"
  >
    <!-- <div class="absolute inset-0 bg-gray-500 opacity-10 "></div> -->
    <div
      id="mouseLight"
      class="absolute top-0 rounded-full mouse-gradient transition-opacity h-[200px] w-[200px]"
      style="opacity: 0"
    />
    <div class="relative px-6 pt-6">
      <header
        class="relative w-full overflow-hidden bg-gray-900 rounded-tl-3xl rounded-br-3xl"
      >
        <div class="md:flex md:justify-between md:items-center">
          <!-- <h1 class="px-8 py-6 text-4xl font-extrabold text-white">
            {{ title }}
          </h1> -->
          <NuxtLink href="/">
            <Logo class="h-6 text-white" />
          </NuxtLink>
          <nav
            class="hidden font-mono uppercase lg:flex lg:space-x-8 lg:py-2"
            aria-label="Global"
          >
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              :class="[
                'text-gray-300 hover:bg-gray-700 hover:text-white',
                'rounded-br-xl rounded-tl-xl py-2 px-3 inline-flex items-center font-medium',
              ]"
              exact-active-class="text-white bg-gray-900"
              :aria-current="item.current ? 'page' : undefined"
              >{{ item.name }}</a
            >
          </nav>
          <div class="flex items-center justify-end p-4 space-x-2">
            <DarkModeToggle class="text-primary-200 hover:text-primary-400" />
            <button
              id="animation-toggle"
              class="text-primary-200 hover:text-primary-400"
            >
              <SparklesIcon class="w-8 h-8" />
            </button>
          </div>
        </div>
      </header>
      <div class="pt-24 mx-auto max-w-screen-2xl" id="content">
        <h1
          class="pt-20 font-serif text-4xl font-bold xs:text-5xl sm:text-7xl lg:text-8xl dark:drop-shadow dark:text-gray-100"
        >
          Web and mobile applications<br class="hidden md:block" />that
          <span class="text-accent">wow your users.</span>
        </h1>

        <p
          class="w-full my-6 font-serif text-base lg:leading-loose tracking-snug sm:text-xl lg:text-2xl md:leading-relaxed md:my-10 dark:text-gray-400"
        >
          We are a team of experienced developers and designers who build
          beautiful, performant, and secure web and mobile applications.
        </p>

        <div class="pt-5">
          <div class="flex">
            <a
              class="rounded-full"
              aria-label="See how we can help you"
              href="/services/"
            >
              <div
                class="box-border px-8 py-4 font-mono text-sm font-bold leading-none tracking-widest text-white lowercase transition-colors duration-300 bg-gray-900 rounded-tr-3xl rounded-bl-3xl sm:text-base md:text-lg word-spacing-tight sm:px-10 dark:bg-accent"
              >
                Learn How We Help
              </div>
            </a>
          </div>
        </div>
      </div>
      <div id="nuxtImg"></div>
      <div class="nuxt-loader-bar"></div>
      <BlocksFaqs :data="faqs" />
    </div>
  </div>
</template>

<script setup>
import { SparklesIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Services', href: '#' },
  { name: 'Projects', href: '#' },
  { name: 'About', href: '#' },
  { name: 'Blog', href: '#' },
]

const faqs = {
  title: 'Frequently Asked Questions',
  headline: 'What can we <em>help</em> you with?',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  faqs: [
    {
      title: 'What is the best way to contact you?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'What is the best way to contact you?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'What is the best way to contact you?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'What is the best way to contact you?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ],
}

const title = 'Directus & Nuxt 3 Starter'
useHead({
  title: title,
})

// if (process.client) {
//   const ANIMATION_KEY = 'nuxt-loading-enable-animation'
//   const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

//   let isLowPerformance = checkIsLowPerformance()
//   let enableAnimation =
//     localStorage.getItem(ANIMATION_KEY) === 'false'
//       ? false
//       : localStorage.getItem(ANIMATION_KEY) === 'true'
//       ? true
//       : !isLowPerformance

//   const mouseLight = window.document.getElementById('mouseLight')
//   const nuxtImg = window.document.getElementById('nuxtImg')
//   //   const animationToggle = window.document.getElementById('animation-toggle')
//   const body = window.document.body
//   let bodyRect

//   function checkIsLowPerformance() {
//     return (
//       window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
//       navigator.hardwareConcurrency < 2 ||
//       navigator.deviceMemory < 1 ||
//       // Safari has some performance issue on the blur filter. Remove this when it's fixed.
//       isSafari
//     )
//   }
//   function calculateDistance(elem, mouseX, mouseY) {
//     return Math.floor(
//       Math.sqrt(
//         Math.pow(mouseX - (elem.x + elem.width / 2), 2) +
//           Math.pow(mouseY - (elem.top + elem.height / 2), 2)
//       )
//     )
//   }
//   function onFocusOut() {
//     if (!enableAnimation) {
//       return
//     }
//     mouseLight.style.opacity = 0
//     nuxtImg.style.opacity = 0.7
//   }
//   function onMouseMove(e) {
//     if (!enableAnimation) {
//       return
//     }
//     const pointerRect = nuxtImg.getBoundingClientRect()
//     if (!bodyRect) {
//       bodyRect = body.getBoundingClientRect()
//     }
//     const distance = calculateDistance(pointerRect, e.pageX, e.pageY)
//     const size = Math.max((1000 - distance) / 2 / 100, 1)

//     mouseLight.style.top = `${
//       e.clientY - bodyRect.y - mouseLight.clientHeight / 2
//     }px`
//     mouseLight.style.left = `${e.clientX - mouseLight.clientWidth / 2}px`
//     mouseLight.style.width = mouseLight.style.height = `${Math.max(
//       Math.round(size * 100),
//       300
//     )}px`
//     mouseLight.style.filter = `blur(${Math.min(
//       Math.max(size * 50, 100),
//       160
//     )}px)`
//     mouseLight.style.opacity = Math.min(Math.max(size / 4, 0.6), 1)

//     const dx = e.pageX - pointerRect.left
//     const dy = e.pageY - pointerRect.top
//     const logoGradient = `radial-gradient(circle at ${dx}px ${dy}px, black 75%, transparent 100%)`
//     nuxtImg.style['-webkit-mask-image'] = logoGradient
//     nuxtImg.style['mask-image'] = logoGradient
//     nuxtImg.style.opacity = Math.min(Math.max(size / 4, 0.7), 1)
//   }

//   function toggleAnimation(value = !enableAnimation) {
//     enableAnimation = value
//     document.body.classList.toggle('visual-effects', enableAnimation)
//     if (value) {
//       onFocusOut()
//     } else {
//       mouseLight.style.opacity = 0
//       nuxtImg.style.opacity = 1
//       nuxtImg.style['mask-image'] = ''
//       nuxtImg.style['-webkit-mask-image'] = ''
//     }
//     localStorage.setItem(ANIMATION_KEY, enableAnimation ? 'true' : 'false')
//   }

//   //   animationToggle.addEventListener('click', () => toggleAnimation(), {
//   //     passive: true,
//   //   })
//   body.addEventListener('mousemove', onMouseMove, { passive: true })
//   body.addEventListener('mouseleave', onFocusOut, { passive: true })

//   //   toggleAnimation(enableAnimation)
// }
</script>
<style></style>
