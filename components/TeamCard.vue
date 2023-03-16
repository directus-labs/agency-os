<script setup lang="ts">
const props = defineProps<{
  person: {
    id: string
    name: string
    job_title: string
    image: string
    social_media?: {
      service?: string
      url?: string
    }
  }
}>()
const { fileUrl } = useFiles()
const flipped = ref(false)

const icons = {
  github: '/svg/github.svg',
  linkedin: '/svg/linkedin.svg',
  twitter: '/svg/twitter.svg',
  instagram: '/svg/instagram.svg',
  facebook: '/svg/facebook.svg',
  youtube: '/svg/youtube.svg',
  website: '/svg/website.svg',
}
</script>
<template>
  <div
    class="opacity-0 cursor-pointer select-none animate-fade-in"
    @click="flipped = !flipped"
  >
    <div
      class="relative w-full h-full overflow-hidden rounded-br-3xl rounded-tl-3xl"
    >
      <!-- Front of Team Card -->
      <div>
        <img
          class="object-cover w-full h-full transition duration-300 grayscale group-hover:grayscale-0"
          :src="fileUrl(person.image)"
          :alt="''"
        />

        <Motionable
          name="team"
          :show="flipped"
          class="absolute inset-0 bg-accent"
          v-motion
          :initial="{
            opacity: 0,
            y: 100,
            x: 100,
            scale: 0.9,
          }"
          :enter="{
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
          }"
          :leave="{
            opacity: 0,
            scale: 0.9,
            x: 100,
            y: 100,
          }"
        >
          <div class="relative p-4">
            <p class="font-mono tracking-wider uppercase">Links</p>
            <div class="mt-2 space-y-4">
              <NuxtLink
                v-for="link in person.social_media"
                :key="link.service"
                class="flex border border-gray-900"
                :href="link.url"
                target="_blank"
              >
                <div
                  class="flex items-center justify-center flex-none text-black border-r border-black w-14"
                >
                  <img
                    :src="icons[link.service]"
                    class="w-8 h-8 md:w-10 md:h-10"
                  />
                </div>
                <div
                  class="flex flex-col justify-center py-2 pl-3 pr-2 overflow-hidden md:py-3"
                >
                  <div
                    class="pb-1 font-mono text-lg font-semibold leading-none tracking-tight text-black uppercase truncate word-spacing-tight"
                  >
                    {{ link.service }}
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </Motionable>

        <div class="absolute z-10 bottom-4 left-7 right-7">
          <h3
            class="pb-2 font-serif text-3xl text-white font-extralight text-shadow leading-tight-2 2xl:text-4xl 2xl:leading-tight-2"
            title="Dan Sheetz | Co-Founder &amp; Chief Strategy Officer"
          >
            {{ person.name }}
          </h3>

          <p
            class="font-mono text-sm font-bold tracking-widest uppercase word-spacing-tight text-accent"
            title="Dan Sheetz | Co-Founder &amp; Chief Strategy Officer"
          >
            {{ person.job_title }}
          </p>
        </div>

        <div
          class="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black h-1/3 opacity-80"
        ></div>
      </div>
      <!-- Back of Team Card -->
    </div>
  </div>
</template>
