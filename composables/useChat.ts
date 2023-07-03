const page = ref('home')

const messages = ref([])
const newMessage = reactive({
  text: '',
})
const showMenu = ref(true)
const chatWindow = ref(null as HTMLElement | null)
const chatConfig = ref(null as any)
const selectedConversation = ref(null as any)

export default function useChat() {
  const modules = {
    home: {
      icon: 'heroicons:home',
      title: 'Home',
    },
    chat: {
      icon: 'heroicons:chat-bubble-left-ellipsis',
      title: 'Chat',
    },
    help: {
      icon: 'heroicons:lifebuoy',
      title: 'Help',
    },
    articles: {
      icon: 'heroicons:newspaper',
      title: 'Articles',
    },
  }
  const enabledModules = computed(() => {
    return Object.fromEntries(
      Object.entries(modules).filter(([key, value]) => {
        return chatConfig.value?.modules.includes(key)
      })
    )
  })
  const { $directus } = useNuxtApp()

  const { connection, subscribe } = useWebsocket(messageListener)

  const session = useCookie('session')

  function subscribeToMessages() {
    // Subscribe to the messages collection
    subscribe({
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
      uid: 'messages' + session.value?.id,
    })
  }

  function subscribeToConversations() {
    // Subscribe to the conversations collection
    subscribe({
      type: 'subscribe',
      collection: 'conversations',
      query: {
        fields: ['*'],
        sort: 'date_created',
      },
      uid: 'conversations' + session.value?.id,
    })
  }

  function messageListener(data: any) {
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
  }

  function sendMessage(message: object) {
    connection.value?.send(
      JSON.stringify({
        type: 'items',
        action: 'create',
        collection: 'messages',
        data: {
          text: message.text,
          visitor_id: session.value?.id,
          conversation: selectedConversation.value?.id,
        },
      })
    )
    newMessage.text = ''
  }

  // *** HELPERS ***

  async function getChatConfig() {
    const { data } = await $directus.items('chat_config').readByQuery({})
    chatConfig.value = data
  }

  function getMessageUser(message: any) {
    if (message.user_created) {
      return message.user_created
    }

    return {
      id: session.value?.id,
      first_name: 'Anonymous',
      last_name: 'User',
      avatar: null,
    }
  }

  function isCurrentUser(message: any) {
    return message.visitor_id === session.value?.id
  }

  return {
    page,
    messages,
    newMessage,
    getMessageUser,
    chatConfig,
    isCurrentUser,
    subscribeToMessages,
    sendMessage,
    chatWindow,
    selectedConversation,
    modules,
    showMenu,
    subscribeToConversations,
    getChatConfig,
    enabledModules,
  }
}
