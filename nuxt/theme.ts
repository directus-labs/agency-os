export interface Theme {
	primary: string;
	gray: string;
	borderRadius: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | 'full';
	googleFonts: {
		[key: string]: boolean | number[];
	};
	fonts: {
		display: string;
		sans: string;
		code: string;
		signature: string;
	};
}

export const theme = {
	primary: 'violet',
	gray: 'slate',
	borderRadius: 'lg',
	googleFonts: {
		Inter: true,
		'Fira Code': true,
		Poppins: [400, 500, 600, 700, 800, 900],
		'Nothing You Could Do': true,
	},
	fonts: {
		display: 'Poppins',
		sans: 'Inter',
		code: 'Fira Code',
		signature: 'Nothing You Could Do',
	},
} as Theme;

export const borderRadiusMap = {
	none: {
		card: '0px',
		button: '0px',
		input: '0px',
		panel: '0px',
	},
	sm: {
		card: '0.125rem',
		button: '0.125rem',
		input: '0.125rem',
		panel: '0.125rem',
	},
	base: {
		card: '0.25rem',
		button: '0.25rem',
		input: '0.25rem',
		panel: '0.25rem',
	},

	md: {
		card: '0.375rem',
		button: '0.375rem',
		input: '0.375rem',
		panel: '0.375rem',
	},
	lg: {
		card: '0.5rem',
		button: '0.5rem',
		input: '0.5rem',
		panel: '0.5rem',
	},
	xl: {
		card: '0.75rem',
		button: '0.75rem',
		input: '0.5rem',
		panel: '0.75rem',
	},
	full: {
		card: '0.75rem',
		button: '9999px',
		input: '9999px',
		panel: '0.75rem',
	},
};
