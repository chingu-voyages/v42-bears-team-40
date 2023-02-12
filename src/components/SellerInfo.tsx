import { useSession } from 'next-auth/react';
import { User, Address } from '@prisma/client';
import SellerImg from './SellerImg';
import Button from './Button';
import SellerDetails from './SellerDetails';
import { useState } from 'react';

type SellerProps = {
  user: User;
  address?: Address;
};

const SellerInfo = ({ user, address }: SellerProps) => {
  const { data: session } = useSession();
  const { name = '', image = '' } = user;
  const [sellerImage, setSellerImage] = useState(image);
  const [isUpdating, setIsUpdating] = useState(false);
  const id = session?.user.id;

  return (
    <div className='seller-container h-72 md:h-48 flex items-center justify-center bg-gray-ish drop-shadow-md'>
      <div className='seller-content w-full px-6 flex flex-shrink-0 items-center'>
        <SellerImg image={sellerImage} hidden={isUpdating ? true : false} />
        <div className='seller-info flex-grow tracking-wide w-60'>
          {session && id === user.id ? (
            <SellerDetails
              handleUpdating={setIsUpdating}
              isUpdating={isUpdating}
              user={user}
              address={address}
              handleSetImage={setSellerImage}
            />
          ) : (
            <>
              <p className='font-bold text-lg md:text-xl text-slate-800 mb-2'>
                {name}
              </p>
              <div className='mt-3'>
                <Button style='profile-button' link={`/contact/${user.id}`}>
                  Contact
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
