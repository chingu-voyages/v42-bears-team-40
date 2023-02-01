export default async function getSeller(id) {
  try {
    const response = await fetch(`../api/seller-data/${id}`);
    const { user, address } = await response.json();
    const seller = {
      name: user.name,
      email: user.email,
      address: address?.address ?? '',
      city: address?.city ?? '',
      state: address?.state ?? '',
      zipCode: address?.zipCode || '',
    };
    return { seller, address };
  } catch {
    console.error;
  }
}
