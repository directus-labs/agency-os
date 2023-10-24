function interpolate(str, params) {
	const names = Object.keys(params);
	const vals = Object.values(params);
	return new Function(...names, `return \`${str}\`;`)(...vals);
}

module.exports = async function (data) {
	const test = 'Bryant';
	const email = data.get_email_template[0];
	const body = email.body;
	const result = interpolate(body, { test });

	// Do something...
	return result;
};
