import { theme } from '~/theme';

export default defineAppConfig({
	theme,
	ui: {
		strategy: 'override',
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
			rounded: `rounded-card`,
		},

		button: {
			// base: 'hover:scale-105 active:hover:scale-95 transition duration-150',
			font: 'font-bold',
			rounded: 'rounded-button',
			default: {
				loadingIcon: 'material-symbols:sync-rounded',
			},
		},
		badge: {
			rounded: 'rounded-button',
		},
		input: {
			default: {
				loadingIcon: 'material-symbols:sync-rounded',
			},
			rounded: `rounded-${theme.borderRadius}`,
		},
		select: {
			rounded: 'rounded-input',
			default: {
				loadingIcon: 'material-symbols:sync-rounded',
				trailingIcon: 'material-symbols:expand-more-rounded',
			},
		},
		textarea: {
			rounded: 'rounded-input',
		},
		selectMenu: {
			rounded: 'rounded-input',
			default: {
				selectedIcon: 'material-symbols:fitbit-check-small-rounded',
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
				icon: 'material-symbols:search-rounded',
				loadingIcon: 'material-symbols:sync-rounded',
				selectedIcon: 'material-symbols:fitbit-check-small-rounded',
				emptyState: {
					icon: 'material-symbols:search-rounded',
				},
			},
		},
		table: {
			default: {
				sortAscIcon: 'octicon:sort-asc-24',
				sortDescIcon: 'octicon:sort-desc-24',
				// sortButton: {
				// 	icon: 'octicon-arrow-switch-24',
				// },
				loadingState: {
					icon: 'material-symbols:sync-rounded',
				},
				emptyState: {
					icon: 'material-symbols:database-outline',
				},
			},
		},
		avatar: {
			default: {},
			rounded: 'rounded-button',
		},
		breadcrumb: {
			default: {
				divider: 'material-symbols:chevron-right',
			},
		},
		pagination: {
			rounded: 'first:rounded-l-button last:rounded-r-button',
			default: {
				prevButton: {
					icon: 'material-symbols:arrow-back-rounded',
				},
				nextButton: {
					icon: 'material-symbols:arrow-forward-rounded',
				},
			},
		},
	},
});
