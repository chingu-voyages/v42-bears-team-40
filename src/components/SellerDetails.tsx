import { useState, useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { User, Address } from '@prisma/client';
import addressIcon from '../styles/images/address.png';
import mailIcon from '../styles/images/mail.png';
import checkAddressAdded from '../utils/checkAddress';
import getSeller from '../utils/getSeller';

type Props = {
  user: User;
  address?: Address;
  handleUpdating: Dispatch<SetStateAction<boolean>>;
  isUpdating: boolean;
};

const SellerDetails = ({
  user,
  address,
  handleUpdating,
  isUpdating,
}: Props) => {
  const { name, email, id } = user;

  const initialUser = {
    name,
    email,
    address: address?.address || '',
    city: address?.city || '',
    state: address?.state || '',
    zipCode: address?.zipCode || '',
  };

  const [userForm, setUserForm] = useState(initialUser);
  const [userInfo, setUserInfo] = useState(initialUser);
  const [hasAddress, setHasAddress] = useState(false);

  // Fetch seller info from database
  const getSellerInfo = async () => {
    const { seller, address } = await getSeller(id);
    setUserInfo(seller);
    if (address) setHasAddress(true);
  };

  useEffect(() => {
    getSellerInfo();
  }, []);

  const handleOnChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const saveUpdate = async (e) => {
    e.preventDefault();
    try {
      // Update user name & email
      const response = await fetch(`/api/seller-name-email/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userForm),
      });
      const user = response.json();
      const { address, city, state, zipCode } = userForm;
      const updatedAddress = checkAddressAdded(address, city, state, zipCode);
      // If new address and no address yet, create an address
      let sellerAddress;
      if (!hasAddress && updatedAddress) {
        const response = await fetch(`/api/seller-address`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id,
            address,
            city,
            state,
            zipCode,
          }),
        });
        sellerAddress = await response.json();
      }
      // If new address and had an address, update address
      if (hasAddress && updatedAddress) {
        const response = await fetch(`/api/seller-address/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address,
            city,
            state,
            zipCode,
          }),
        });
        sellerAddress = await response.json();
      }
      address
        ? setUserInfo({ ...userInfo, ...user, ...sellerAddress })
        : setUserInfo({ ...userInfo, ...user });
      handleUpdating(false);
      getSellerInfo();
    } catch (error) {
      console.log(error);
    }
  };

  return isUpdating ? (
    <form className="p-2 w-full">
      <div className="w-full flex">
        <label htmlFor="name" className="font-semibold">
          Name
        </label>
        <input
          className="seller-input w-64 mb-2"
          type="text"
          value={userForm.name}
          name="name"
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <div className="w-full flex">
        <label htmlFor="email" className="font-semibold">
          Email{' '}
        </label>
        <input
          className="seller-input w-64 mb-2"
          type="email"
          value={userForm.email}
          name="email"
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <div className="w-full flex">
        <label htmlFor="address" className="font-semibold">
          Street{' '}
        </label>
        <input
          className="seller-input w-64 mb-2"
          type="text"
          value={userForm.address}
          name="address"
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <div className="flex-col md:flex md:flex-row">
        <div className="w-full md:w-fit flex">
          <label htmlFor="city" className="font-semibold">
            City{' '}
          </label>
          <input
            className="seller-input md:w-32 md:mr-3 mb-2 md:mb-0"
            type="text"
            value={userForm.city}
            name="city"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="w-full md:w-fit flex">
          <label htmlFor="state" className="font-semibold">
            State{' '}
          </label>
          <input
            className="seller-input rounded md:w-10 md:mr-3 mb-2 md:mb-0"
            type="text"
            value={userForm.state}
            name="state"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="w-full md:w-fit flex">
          <label htmlFor="zipCode" className="font-semibold">
            Zip Code{' '}
          </label>
          <input
            className="seller-input md:w-20 mb-2 md:mb-0"
            type="number"
            value={userForm.zipCode}
            name="zipCode"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
      </div>
      <div className="text-sm">
        <button
          className="text-violet-600 hover:underline text-base mt-2"
          onClick={(e) => saveUpdate(e)}
        >
          Save
        </button>
      </div>
    </form>
  ) : (
    <>
      <p className="font-bold text-lg md:text-xl text-slate-800 mb-2">
        {userInfo.name}
      </p>
      <div className="text-sm ">
        <div className="flex items-center">
          <img className="h-6 mr-3" src={mailIcon.src} alt="email icon" />
          <p className="text-slate-600">{userInfo.email}</p>
        </div>
        <div className="flex items-center">
          <img className="h-6 mr-3" src={addressIcon.src} alt="address icon" />
          {hasAddress ? (
            <div className="text-slate-700 pt-2">
              <p>{userInfo.address}</p>
              <p>
                <span>{userInfo.city + ', '}</span>
                <span>{userInfo.state + ' '}</span>
                <span>{userInfo.zipCode}</span>
              </p>
            </div>
          ) : (
            <p className="text-slate-700">No address listed</p>
          )}
        </div>
        <button
          className="text-violet-600 hover:underline text-base mt-2"
          onClick={() => handleUpdating(true)}
        >
          Update Profile
        </button>
      </div>
    </>
  );
};

export default SellerDetails;
