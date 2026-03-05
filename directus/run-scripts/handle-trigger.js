// This function is called when used with an Event Hook - Action (Non-Blocking) - Trigger for a flow. It is used to extract the key from the trigger object because the syntax return from Directus can be different depending on the type of trigger. For example, the trigger object for a "New Item" trigger is different than the trigger object for a "New Item in View" trigger. This function is used to extract the key from the trigger object regardless of the type of trigger.

function extractKey(obj) {
	if (obj.key) {
		// If "key" property exists, return its value
		return obj.key;
	} else if (obj.keys && Array.isArray(obj.keys) && obj.keys.length > 0) {
		// If "keys" property exists, is an array, and has at least one element, return the first element
		return obj.keys[0];
	} else {
		// If neither condition is met, return null or throw an error
		throw new Error('Key not found');
	}
}

module.exports = async function (data) {
	const key = extractKey(data.$trigger);

	return key;
};
