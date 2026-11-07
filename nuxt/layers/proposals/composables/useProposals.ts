const showSidebar = ref(false);

export default function useProposals() {
	const toggleSidebar = () => {
		showSidebar.value = !showSidebar.value;
	};

	return {
		showSidebar,
		toggleSidebar,
	};
}
