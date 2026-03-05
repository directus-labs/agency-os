function getContrastColor(hexColor: string) {
	// Convert hex color to RGB format
	const red = parseInt(hexColor.slice(1, 3), 16);
	const green = parseInt(hexColor.slice(3, 5), 16);
	const blue = parseInt(hexColor.slice(5, 7), 16);

	// Calculate relative luminance of the color
	const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

	// Return black or white depending on the luminance value
	return luminance > 0.5 ? '#000000' : '#ffffff';
}

export { getContrastColor };
