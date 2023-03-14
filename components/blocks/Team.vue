<script setup lang="ts">
import { PropType } from 'vue'
import { CheckBadgeIcon } from '@heroicons/vue/24/outline'
import { ArrowRightIcon } from '@heroicons/vue/24/solid'
type Team = {
  id: string
  headline?: string
  title?: string
}
const props = defineProps({
  data: {
    type: Object as PropType<Team>,
    required: true,
  },
})

// Import the $directus plugin
const { $directus } = useNuxtApp()
const { fileUrl } = useFiles()

// Get the params from the Nuxt route
const { params, path } = useRoute()

// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata

const {
  data: team,
  pending,
  error,
} = await useAsyncData(
  'team',
  () => {
    return $directus.items('team').readByQuery({})
  },
  {
    transform: (data) => data.data,
  }
)

// Display four team members
const teamMembers = ref(team.value.slice(0, 4))

const teamToDisplay = computed(() => {
  // Split the team into two arrays
  const teamMembersLeft = teamMembers.value.filter(
    (_, index) => index % 2 === 0
  )
  const teamMembersRight = teamMembers.value.filter(
    (_, index) => index % 2 === 1
  )

  // Return the two arrays as an object
  return {
    left: teamMembersLeft,
    right: teamMembersRight,
  }
})

// Every X seconds, replace one of the team members with a new one from the team array
const replaceTeamMember = () => {
  // Get a random index from the team array
  const randomIndex = Math.floor(Math.random() * team.value.length)

  // Get a random index from the team members array
  const randomTeamMemberIndex = Math.floor(
    Math.random() * teamMembers.value.length
  )

  // Replace the team member at the random index with the team member at the random team member index
  teamMembers.value[randomTeamMemberIndex] = team.value[randomIndex]
}

setInterval(() => {
  replaceTeamMember()
}, 5000)
</script>
<template>
  <section>
    <PageContainer>
      <div
        class="flex flex-col-reverse py-24 mx-auto max-w-screen-2xl lg:flex-row"
      >
        <div class="flex flex-col pt-12 pb-24 pr-8 text-black xl:w-2/5">
          <TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
          <TypographyHeadline v-if="data.headline" :content="data.headline" />
        </div>
        <div class="relative flex-grow">
          <div
            class="flex justify-start flex-grow py-10 space-x-10 lg:justify-end"
          >
            <div
              class="flex flex-row max-w-full -mt-20 space-x-5 lg:flex-col lg:space-x-0 lg:space-y-10"
              v-auto-animate
            >
              <div
                class="flex-none relative w-[340px]"
                v-for="person in teamToDisplay.left"
                :key="person.id"
              >
                <TeamCard :person="person" />
              </div>
            </div>
            <div
              class="flex-col hidden -mb-20 space-y-10 xl:flex"
              v-auto-animate
            >
              <div
                class="flex-none relative w-[340px]"
                v-for="person in teamToDisplay.right"
                :key="person.id"
              >
                <TeamCard :person="person" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  </section>
</template>
