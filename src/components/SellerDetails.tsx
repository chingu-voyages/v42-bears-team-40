import { useState, Dispatch, SetStateAction, useRef } from 'react';
import { User, Address } from '@prisma/client';
import checkAddressAdded from '../utils/checkAddress';
import getSeller from '../utils/getSeller';
import { handleUpdatePhoto } from '../utils/updatePhoto';

type Props = {
  user: User;
  address?: Address;
  handleUpdating: Dispatch<SetStateAction<boolean>>;
  handleSetImage: Dispatch<SetStateAction<string>>;
  isUpdating: boolean;
};

const SellerDetails = ({
  user,
  address,
  handleUpdating,
  isUpdating,
  handleSetImage,
}: Props) => {
  const { name, email, id } = user;
  const imageRef = useRef(null);

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
  const [hasAddress, setHasAddress] = useState(address ? true : false);
  const [updatePhoto, setUpdatePhoto] = useState(false);

  const getSellerInfo = async () => {
    const { seller, address } = await getSeller(id);
    setUserInfo(seller);
    if (address) setHasAddress(true);
  };

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
      let sellerAddress;
      // If new address and no address yet, create an address
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
    <form className='p-2 w-full'>
      <div className='w-full flex'>
        <label htmlFor='name' className='font-semibold'>
          Name
        </label>
        <input
          className='seller-input w-64 mb-2'
          type='text'
          value={userForm.name}
          name='name'
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <div className='w-full flex'>
        <label htmlFor='email' className='font-semibold'>
          Email{' '}
        </label>
        <input
          className='seller-input w-64 mb-2'
          type='email'
          value={userForm.email}
          name='email'
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <div className='w-full flex'>
        <label htmlFor='address' className='font-semibold'>
          Street{' '}
        </label>
        <input
          className='seller-input w-64 mb-2'
          type='text'
          value={userForm.address}
          name='address'
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <div className='flex-col md:flex md:flex-row'>
        <div className='w-full md:w-fit flex'>
          <label htmlFor='city' className='font-semibold'>
            City{' '}
          </label>
          <input
            className='seller-input md:w-32 md:mr-3 mb-2 md:mb-0'
            type='text'
            value={userForm.city}
            name='city'
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className='w-full md:w-fit flex'>
          <label htmlFor='state' className='font-semibold'>
            State{' '}
          </label>
          <input
            className='seller-input rounded md:w-10 md:mr-3 mb-2 md:mb-0'
            type='text'
            value={userForm.state}
            name='state'
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className='w-full md:w-fit flex'>
          <label htmlFor='zipCode' className='font-semibold'>
            Zip Code{' '}
          </label>
          <input
            className='seller-input md:w-20 mb-2 md:mb-0'
            type='number'
            value={userForm.zipCode}
            name='zipCode'
            onChange={(e) => handleOnChange(e)}
          />
        </div>
      </div>
      <div className='text-sm'>
        <button
          className='text-violet-600 hover:underline text-base mt-2'
          onClick={(e) => saveUpdate(e)}
        >
          Save
        </button>
      </div>
    </form>
  ) : !updatePhoto ? (
    <>
      <p className='font-bold text-lg md:text-xl text-slate-800 mb-2'>
        {userInfo.name}
      </p>
      <div className='text-sm '>
        <div className='flex items-center'>
          <img className='h-6 mr-3' src='/images/mail.png' alt='email icon' />
          <p className='text-slate-600'>{userInfo.email}</p>
        </div>
        <div className='flex items-center'>
          <img
            className='h-6 mr-3'
            src='/images/address.png'
            alt='address icon'
          />
          {hasAddress ? (
            <div className='text-slate-700 pt-2'>
              <p>{userInfo.address}</p>
              <p>
                <span>{userInfo.city + ', '}</span>
                <span>{userInfo.state + ' '}</span>
                <span>{userInfo.zipCode}</span>
              </p>
            </div>
          ) : (
            <p className='text-slate-700'>No address listed</p>
          )}
        </div>
        <div className=''>
          <button
            className='profile-button mr-2'
            onClick={() => handleUpdating(true)}
          >
            Update Profile
          </button>
          <button
            className='profile-button'
            onClick={() => setUpdatePhoto(true)}
          >
            Update Photo
          </button>
        </div>
      </div>
    </>
  ) : (
    <div>
      <div className='max-w-50'>
        <input
          ref={imageRef}
          type='file'
          name='image'
          accept='.jpeg, .jpeg, .png'
          className='w-50 overflow-hidden text-xs md:text-base'
        />
      </div>
      <button
        className='btn btn-primary w-40 mt-4'
        onClick={() =>
          handleUpdatePhoto(imageRef, id, handleSetImage, setUpdatePhoto)
        }
      >
        Update
      </button>
    </div>
  );
};

export default SellerDetails;
