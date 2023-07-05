// Define the websocket connection outside of the useChat() function so that it is persistent across multiple calls to useChat().
const connection = ref(null)
const isAuthenticated = ref(false)

const isConnectionOpen = computed(() => {
  return connection.value?.readyState === WebSocket.OPEN
})

interface Subscription {
  type: 'subscribe'
  collection: string
  query: object
  uid: string
}

interface Auth {
  type: 'auth'
  access_token?: string
  email?: string
  password?: string
}

// When calling the composable, pass a callback function to handle the incoming messages.

export default function useWebsocket(onMessage: (data: any) => void) {
  // Config Values
  const config = useRuntimeConfig()
  const wsUrl = config.public.directusWsUrl

  // Functions
  function connect() {
    connection.value = new WebSocket(wsUrl)
    addListeners()
  }

  function authenticate(params: Auth) {
    connection.value?.send(JSON.stringify(params))
  }

  function subscribe(params: Subscription) {
    connection.value?.send(JSON.stringify(params))
  }

  function addListeners() {
    connection.value.onopen = () => {
      authenticate({
        type: 'auth',
        access_token: 'sJgS5ZK_PR2Rdxhocvm1ksWg0JaoJa5Q',
      })
    }

    connection.value?.addEventListener('message', function (event) {
      const data = JSON.parse(event.data)
      console.log({ event: 'onmessage', data })

      if (data.type === 'auth' && data.status === 'ok') {
        isAuthenticated.value = true
      } else if (typeof onMessage === 'function') {
        // Pass the data to the callback function
        onMessage(data)
      }
    })

    connection.value?.addEventListener('close', function () {
      console.log({ event: 'onclose' })
    })

    connection.value?.addEventListener('error', function (error) {
      console.log({ event: 'onerror', error })
    })
  }

  if (!wsUrl || typeof wsUrl !== 'string') {
    throw new Error('Missing websocket URL')
  }

  // Check if the connection is open and if not, connect
  if (process.client && connection.value === null) {
    connect()
  }

  return {
    connection,
    isConnectionOpen,
    connect,
    authenticate,
    subscribe,
  }
}
