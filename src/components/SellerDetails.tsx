import { useState } from 'react';
import { User, Address } from '@prisma/client';
import addressIcon from '../styles/images/address.png';
import mailIcon from '../styles/images/mail.png';

type Props = {
  user: User;
  address?: Address;
};

const SellerDetails = ({ user, address }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { name, email } = user;

  const startUpdate = () => {
    setIsUpdating(true);
  };

  return (
    <>
      <p className="font-bold text-xl text-slate-800 mb-2">{name}</p>
      <div className="text-sm ">
        <div className="flex items-center">
          <img className="h-6 mr-3" src={mailIcon.src} alt="email icon" />
          <p className="text-slate-600">{email}</p>
        </div>
        <div className="flex items-center">
          <img className="h-6 mr-3" src={addressIcon.src} alt="address icon" />
          <div className="text-slate-700 pt-2">
            <p>{address?.address}</p>
            <p>
              <span>{address?.city + ', '}</span>
              <span>{address?.state + ' '}</span>
              <span>{address?.zipCode}</span>
            </p>
          </div>
        </div>
        <button
          className="text-violet-600 hover:underline text-base mt-2"
          onClick={startUpdate}
        >
          Update Profile
        </button>
      </div>
    </>
  );
};

export default SellerDetails;
