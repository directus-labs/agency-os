import type { Organization, OrganizationAddress } from '~/types';

export function getPrimaryBillingAddress(organization: Organization): OrganizationAddress | null {
	if (!organization || !organization.addresses || !Array.isArray(organization.addresses)) {
		return null;
	}

	if (organization.addresses.length === 1) {
		const address = organization.addresses[0];
		return typeof address === 'string' ? null : address;
	}

	for (const address of organization.addresses) {
		if (typeof address === 'string') {
			continue;
		}

		if (address.is_primary_billing) {
			return address;
		}
	}

	return null;
}
