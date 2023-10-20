interface Theme {
	primary: string;
	gray: string;
	borderRadius: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
	googleFonts: {
		[key: string]: boolean | number[];
	};
	fonts: {
		display: string;
		body: string;
		code: string;
		signature: string;
	};
}

export const theme = {
	primary: 'violet',
	gray: 'slate',
	borderRadius: 'xl',
	googleFonts: {
		Inter: true,
		'Fira Code': true,
		Poppins: [400, 500, 600, 700, 800, 900],
		'Nothing You Could Do': true,
	},
	fonts: {
		display: 'Poppins',
		body: 'Inter',
		code: 'Fira Code',
		signature: 'Nothing You Could Do',
	},
} as Theme;
