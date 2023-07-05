<script setup lang="ts">
const { $directus } = useNuxtApp()
const session = useCookie('session')
const { fileUrl } = useFiles()
const config = useRuntimeConfig()
const wsUrl = config.public.directusWsUrl

const connection = ref(null as WebSocket | null)
const isAuthenticated = ref(false)
const currentUser = ref(null as any | null)

const messages = ref([])
const chatWindow = ref(null as HTMLElement | null)

const newMessage = reactive({
  text: '',
})

const form = reactive({
  email: 'kevin@example.com',
  password: 'password',
})

async function login() {
  try {
    const response = await $directus.auth.login({
      email: form.email,
      password: form.password,
    })

    currentUser.value = await $directus.users.me.read()
  } catch (error) {
    console.log(error)
  }

  connection.value = new WebSocket(wsUrl)

  connection.value.addEventListener('open', () => {
    connection.value?.send(
      JSON.stringify({
        type: 'auth',
        access_token: 'hwKFEDFlQjReyxXol8QuXUK3owPh2XF_',
      })
    )
  })

  // Listen for messages
  connection.value.addEventListener('message', (event) => {
    const data = JSON.parse(event.data)

    console.log({ event: 'onmessage', data })

    if (data.type === 'auth' && data.status === 'ok') {
      console.log('Authenticated')
      isAuthenticated.value = true

      connection.value?.send(
        JSON.stringify({
          type: 'subscribe',
          collection: 'messages',
          query: {
            fields: [
              '*',
              'user_created.id',
              'user_created.first_name',
              'user_created.last_name',
              'user_created.avatar',
            ],
            sort: 'date_created',
          },
        })
      )
    }

    if (data.type == 'subscription' && data.event == 'init') {
      for (const message of data.data) {
        messages.value.push(message)
      }
    }

    if (data.type == 'subscription' && data.event == 'create') {
      messages.value.push(data.data[0])
      setTimeout(() => {
        chatWindow.value?.scrollTo({
          top: chatWindow.value.scrollHeight,
          behavior: 'smooth',
        })
      }, 100)
    }
  })

  connection.value.addEventListener('close', function () {
    console.log({ event: 'onclose' })
  })

  connection.value.addEventListener('error', function (error) {
    console.log({ event: 'onerror', error })
  })
}
async function sendMessage() {
  //   connection.value?.send(
  //     JSON.stringify({
  //       type: 'create',
  //       collection: 'messages',
  //       data: {
  //         text: newMessage.text,
  //       },
  //     })
  //   )
  await $directus.items('messages').createOne({
    text: newMessage.text,
    visitor_id: session?.value?.id,
  })

  newMessage.text = ''
}
</script>
<template>
  <PageContainer v-auto-animate>
    <!-- <form

      @submit.prevent="login"
      class="max-w-md p-4 mx-auto mt-4 space-y-4 border-2 border-accent rounded-bl-xl rounded-tr-xl dark:border-gray-700"
    >
      <TypographyHeadline content="Login to Chat" />

      <VInput v-model="form.email" type="email" id="email" label="Email" />

      <VInput
        v-model="form.password"
        label="Password"
        type="password"
        id="password"
      />
      <VButton class="w-full" type="submit">Login</VButton>
    </form> -->

    <div class="max-w-2xl mx-auto">
      <ol
        ref="chatWindow"
        v-auto-animate
        class="flex flex-col space-y-4 overflow-y-auto max-h-[400px] p-3 scrollbar-thumb-accent scrollbar-thumb-rounded scrollbar-track-accent scrollbar-w-2 scrolling-touch"
      >
        <li v-if="messages.length === 0">
          <TypographyHeadline content="No messages yet" />
        </li>
        <li
          v-for="message in messages"
          :key="message.id"
          class="flex items-start w-full space-x-2"
          :class="{
            'justify-start': message.user_created.id !== currentUser.id,
            'justify-end': message.user_created.id === currentUser.id,
          }"
        >
          <img
            :class="['object-cover rounded-full dark:brightness-90 w-8 h-8']"
            :src="fileUrl(message.user_created.avatar)"
          />
          <p
            :class="[
              {
                'bg-gray-200 text-gray-800 rounded-br-none':
                  message.user_created.id !== currentUser.id,
                'bg-accent text-white rounded-bl-none':
                  message.user_created.id === currentUser.id,
              },
              'px-4 py-2 rounded-xl  inline-block',
            ]"
          >
            {{ message.text }}
          </p>
        </li>
      </ol>
      <form @submit.prevent="sendMessage">
        <div class="flex items-center space-x-2">
          <VInput
            class="w-full"
            v-model="newMessage.text"
            type="text"
            id="message"
          />
          <VButton class="flex-shrink-0 text-sm" type="submit"
            >Send Message
          </VButton>
        </div>
      </form>
    </div>
  </PageContainer>
</template>
