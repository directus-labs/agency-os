import { v4 as uuidv4 } from 'uuid';

function generateId(): string {
	return uuidv4();
}

function stripHTML(original: string | undefined): string | undefined {
	if (!original) return;
	else return original.replace(/(<([^>]+)>)/gi, '');
}

function truncateString(str: string | undefined, num: number): string | undefined {
	if (!str) return;

	if (str.length <= num) {
		return str;
	}

	return str.slice(0, num) + '...';
}

function truncateHTML(html: string | undefined, num: number): string | undefined {
	if (!html) return;
	return truncateString(stripHTML(html), num);
}

// Slugify a string for hyphens and underscores
function slugify(str: string | undefined): string | undefined {
	if (!str) return;
	return str
		.toString()
		.trim()
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '-');
}

// Deslugify a string for hyphens and underscores and capitalize each word
function deslugify(str: string | undefined): string | undefined {
	if (!str) return;
	return str
		.trim()
		.toLowerCase()
		.replace(/[-_]+/g, ' ')
		.replace(/ +/g, ' ')
		.replace(/(^| )(\w)/g, (s) => s.toUpperCase());
}

function getDomainNameFromEmail(email: string): string {
	const temp = email.replace(/.*@/, '').split('.');
	return temp[temp.length - 2];
}

function toTitleCase(str: string | undefined): string | undefined {
	if (!str) return;
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

function snakeToCamel(s: string): string {
	return s.replace(/(_\w)/g, function (m) {
		return m[1].toUpperCase();
	});
}

function convertIconName(name: string): string | null | undefined {
	if (!name) return;
	// Convert the icon coming from the API to the name of the icon component
	// Directus uses Google Material Icons and the icon values are snake_case (e.g. "account_circle")
	const prefix = 'material-symbols:';
	// Change snake case to kebab case
	const kebabCase = name.replace(/_/g, '-');
	const iconName = prefix + kebabCase;
	return iconName;
}

function snakeToKebab(s: string): string {
	return s.replace(/(_\w)/g, function (m) {
		return '-' + m[1].toLowerCase();
	});
}

function maybePluralize(count: number, noun: string, suffix = 's'): string {
	return `${noun}${count !== 1 ? suffix : ''}`;
}

// Calculate read time for a string
function calculateReadTime(str: string | undefined, wordsPerMinute = 200): string | undefined {
	if (!str) return;
	// Strip HTML tags
	str = str.replace(/(<([^>]+)>)/gi, '');
	const noOfWords = str.split(/\s/g).length;
	const minutes = noOfWords / wordsPerMinute;
	const readTime = Math.ceil(minutes);
	return readTime + ' min read';
}

export {
	generateId,
	stripHTML,
	truncateHTML,
	truncateString,
	maybePluralize,
	toTitleCase,
	snakeToCamel,
	snakeToKebab,
	convertIconName,
	slugify,
	deslugify,
	getDomainNameFromEmail,
	calculateReadTime,
};
