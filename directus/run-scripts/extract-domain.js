function extractDomain(inputUrl) {
	// Regular expression to extract domain from URL
	const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i;
	const matches = inputUrl.match(regex);

	// Return the matched domain or undefined if not found
	return matches && matches[1];
}

module.exports = function (data) {
	const website = data.$trigger.payload.website;

	const domain = extractDomain(website);

	if (!domain) {
		throw new Error('Unable to properly determine the domain for this website');
	}
	return domain;
};
