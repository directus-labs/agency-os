function calculateInvoiceTotals(invoice) {
	if (!invoice || !Array.isArray(invoice.line_items)) {
		throw new Error('Invalid invoice data format.');
	}

	let subtotal = 0;
	let totalTax = 0;

	for (let item of invoice.line_items) {
		if (item.line_amount) {
			subtotal += parseFloat(item.line_amount);
		}

		if (item.tax_amount) {
			totalTax += parseFloat(item.tax_amount);
		}
	}

	let changes = {};

	if (invoice.subtotal !== subtotal.toFixed(2)) {
		changes.subtotal = subtotal.toFixed(2);
	}

	if (invoice.total_tax !== totalTax.toFixed(2)) {
		changes.total_tax = totalTax.toFixed(2);
	}

	let total = (subtotal + totalTax).toFixed(2);
	if (invoice.total !== total) {
		changes.total = total;
	}

	if (Object.keys(changes).length === 0) {
		return null; // No changes detected
	}

	return changes;
}

module.exports = async function (data) {
	try {
		const changes = calculateInvoiceTotals(data.invoice);
		if (changes) {
			return changes;
		} else {
			throw new Error('No changes necessary');
		}
	} catch (error) {
		throw new Error(error.message);
	}
};
