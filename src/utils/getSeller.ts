export default async function getSeller(id) {
  try {
    const response = await fetch(`../api/seller/${id}`);
    const { user } = await response.json();
    const address = user.address[0];
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
