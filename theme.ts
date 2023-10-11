export interface Theme {
	primary: string;
	gray: string;
	borderRadius: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
	// panelBackground: 'solid' | 'translucent';
	fonts: {
		families: {
			display: string;
			body: string;
			code: string;
		};
	};
}

export const theme = {
	primary: 'teal',
	gray: 'zinc',
	borderRadius: 'lg',
	// panelBackground: 'solid',
	fonts: {
		families: {
			display: 'Poppins',
			body: 'Inter',
			code: 'Fira Code',
		},
	},
} as Theme;

const borderRadius = {
	none: {
		buttons: 'none',
		inputs: {
			text: 'none',
			boxes: 'none',
		},
		panels: 'none',
	},
	sm: {
		buttons: 'sm',
		inputs: {
			text: 'sm',
			boxes: 'sm',
		},
		panels: 'sm',
	},
	base: {
		buttons: 'base',
		inputs: {
			text: 'base',
			boxes: 'base',
		},
		panels: 'base',
	},
	md: {
		buttons: 'md',
		inputs: 'md',
		panels: 'md',
	},
	lg: {
		buttons: 'lg',
		inputs: 'lg',
		panels: 'lg',
	},
	xl: {
		buttons: 'xl',
		inputs: 'xl',
		panels: 'xl',
	},
	'2xl': {
		buttons: '2xl',
		inputs: '2xl',
		panels: '2xl',
	},
	'3xl': {
		buttons: '3xl',
		inputs: '3xl',
		panels: '3xl',
	},
	full: {
		buttons: 'full',
		inputs: 'full',
		panels: '3xl',
	},
};
