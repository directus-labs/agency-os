module.exports = async function (data) {
	const item = { ...data.invoice_items, ...data.$trigger.payload };

	// Basic validation for unit_price and quantity
	if (!item.unit_price || !item.quantity) {
		throw new Error('Missing or invalid unit_price or quantity.');
	}

	// Calculate line_amount
	const lineAmount = parseFloat(item.unit_price) * parseFloat(item.quantity);
	if (isNaN(lineAmount)) {
		throw new Error('Error calculating line_amount.');
	}
	item.line_amount = lineAmount;

	// Validate and calculate tax_amount if tax_rate is provided
	if (item.tax_rate && item.tax_rate.rate) {
		const taxRateId = item.tax_rate.id;
		const taxAmount = (lineAmount * parseFloat(item.tax_rate.rate)) / 100;
		if (isNaN(taxAmount)) {
			throw new Error('Error calculating tax_amount.');
		}
		item.tax_amount = taxAmount;

		delete item.tax_rate;
		item.tax_rate = taxRateId;
	} else {
		item.tax_amount = 0;
	}

	return item;
};
