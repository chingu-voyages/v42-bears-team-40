export default function checkAddressAdded(address, city, state, zipCode) {
  if (address === '' && city === '' && state === '' && zipCode === '') {
    return false;
  }
  return true;
}
