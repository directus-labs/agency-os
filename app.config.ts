import { theme } from '~/theme';
export default defineAppConfig({
	theme,
	ui: {
		icons: 'all',
		primary: theme.primary,
		gray: theme.gray,
		notifications: {
			// Show toasts at the top right of the screen
			position: 'top-0 right-0 bottom-auto left-auto',
		},
		card: {
			base: 'transition duration-200',
			shadow: 'shadow-none',
			body: {
				base: 'h-full flex flex-col',
			},
			// rounded: `rounded-${theme.borderRadius}`,
		},

		button: {
			base: 'hover:scale-105 active:hover:scale-95 transition duration-150',
			font: 'font-bold',
			rounded: `rounded-${theme.borderRadius}`,
			default: {
				loadingIcon: 'material-symbols:sync-rounded',
			},
		},
		input: {
			default: {
				loadingIcon: 'i-octicon-sync-24',
			},
		},
		select: {
			default: {
				loadingIcon: 'i-octicon-sync-24',
				trailingIcon: 'i-octicon-chevron-down-24',
			},
		},
		selectMenu: {
			default: {
				selectedIcon: 'i-octicon-check-24',
			},
		},
		notification: {
			default: {
				closeButton: {
					icon: 'i-octicon-x-24',
				},
			},
		},
		commandPalette: {
			default: {
				icon: 'i-octicon-search-24',
				loadingIcon: 'i-octicon-sync-24',
				selectedIcon: 'i-octicon-check-24',
				emptyState: {
					icon: 'i-octicon-search-24',
				},
			},
		},
		table: {
			default: {
				sortAscIcon: 'i-octicon-sort-asc-24',
				sortDescIcon: 'i-octicon-sort-desc-24',
				sortButton: {
					icon: 'i-octicon-arrow-switch-24',
				},
				loadingState: {
					icon: 'i-octicon-sync-24',
				},
				emptyState: {
					icon: 'i-octicon-database-24',
				},
			},
		},
		pagination: {
			default: {
				prevButton: {
					icon: 'i-octicon-arrow-left-24',
				},
				nextButton: {
					icon: 'i-octicon-arrow-right-24',
				},
			},
		},
	},
});
