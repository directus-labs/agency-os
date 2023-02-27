<script setup lang="ts">
const props = defineProps<{
  person: {
    id: string
    name: string
    job_title: string
    image: string
    social_media: {
      service: string
      url: string
    }
  }
}>()
const { fileUrl } = useFiles()
const flipped = ref(false)
</script>
<template>
  <div
    class="group select-none cursor-pointer transition ease-in-out delay-50 duration-300 scale-100"
    @click="flipped = !flipped"
  >
    <div
      class="relative w-full h-full overflow-hidden rounded-br-3xl rounded-tl-3xl"
    >
      <!-- Front of Team Card -->
      <div>
        <img
          class="object-cover w-full h-full transition delay-50 duration-300 grayscale group-hover:grayscale-0"
          :src="fileUrl(person.image)"
          :alt="''"
        />

        <div v-if="flipped" class="bg-accent absolute inset-0">
          <div class="relative p-4">
            <p class="font-mono uppercase tracking-wider">Links</p>
            <div class="space-y-4 mt-2">
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
                    :src="`/svg/${link.service}.svg`"
                    class="w-8 h-8 md:w-10 md:h-10"
                  />
                </div>
                <div
                  class="flex flex-col justify-center py-2 pl-3 pr-2 overflow-hidden md:py-3"
                >
                  <div
                    class="pb-1 font-mono text-lg font-semibold leading-none tracking-tight text-black truncate word-spacing-tight uppercase"
                  >
                    {{ link.service }}
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>

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
