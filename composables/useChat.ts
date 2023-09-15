const page = ref('home');

const messages = ref([]);
const newMessage = reactive({
	text: '',
});
const showMenu = ref(true);
const chatWindow = ref(null as HTMLElement | null);
const chatConfig = ref(null as any);
const selectedConversation = ref(null as any);

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
	};
	const enabledModules = computed(() => {
		return Object.fromEntries(
			Object.entries(modules).filter(([key, value]) => {
				return chatConfig.value?.modules.includes(key);
			}),
		);
	});

	const { $directus, $ws, $readItems } = useNuxtApp();

	const session = useCookie('session');

	async function subscribeToMessages() {
		const { subscription, unsubscribe } = await $ws.subscribe('messages', {
			query: {
				fields: ['*', 'user_created.id', 'user_created.first_name', 'user_created.last_name', 'user_created.avatar'],
				sort: 'date_created',
			},
		});
	}

	async function subscribeToConversations() {
		const { subscription, unsubscribe } = await $ws.subscribe('conversations', {
			query: {
				fields: ['*'],
				sort: 'date_created',
			},
		});
	}

	function messageListener(data: any) {
		if (data.type == 'subscription' && data.event == 'init') {
			for (const message of data.data) {
				messages.value.push(message);
			}
		}

		if (data.type == 'subscription' && data.event == 'create') {
			messages.value.push(data.data[0]);
			setTimeout(() => {
				chatWindow.value?.scrollTo({
					top: chatWindow.value.scrollHeight,
					behavior: 'smooth',
				});
			}, 100);
		}
	}

	async function connect() {
		await $ws.connect();

		$ws.onWebSocket('open', function () {
			console.log({ event: 'onopen' });
		});

		$ws.onWebSocket('message', function (message) {
			const { type, data } = message;
			console.log({ event: 'onmessage', data });
		});

		$ws.onWebSocket('close', function () {
			console.log({ event: 'onclose' });
		});

		$ws.onWebSocket('error', function (error) {
			console.log({ event: 'onerror', error });
		});
	}

	async function sendMessage(message: object) {
		$ws.sendMessage({
			type: 'items',
			action: 'create',
			collection: 'messages',
			// data: {
			// 	text: 'test',
			// 	// visitor_id: session.value?.id,
			// 	// conversation: selectedConversation.value?.id,
			// },
		});

		newMessage.text = '';
	}

	// *** HELPERS ***

	async function getChatConfig() {
		const data = await $directus.request($readItems('messenger_config', {}));
		chatConfig.value = data;
	}

	function getMessageUser(message: any) {
		if (message.user_created) {
			return message.user_created;
		}

		return {
			id: session.value?.id,
			first_name: 'Anonymous',
			last_name: 'User',
			avatar: null,
		};
	}

	function isCurrentUser(message: any) {
		return message.visitor_id === session.value?.id;
	}

	return {
		page,
		messages,
		newMessage,
		getMessageUser,
		chatConfig,
		isCurrentUser,
		sendMessage,
		chatWindow,
		selectedConversation,
		modules,
		showMenu,
		connect,
		subscribeToMessages,
		subscribeToConversations,
		getChatConfig,

		enabledModules,
	};
}
