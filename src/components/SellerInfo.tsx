import { useSession } from 'next-auth/react';
import { User, Address } from '@prisma/client';
import SellerImg from './SellerImg';
import Button from './Button';
import SellerDetails from './SellerDetails';

type SellerProps = {
  user: User;
  address?: Address;
};

const SellerInfo = ({ user, address }: SellerProps) => {
  const { data: session } = useSession();
  const { name, image } = user;

  return (
    <div className="seller-container h-48 flex items-center bg-blue-200">
      <div className="seller-content px-6 flex items-center">
        <SellerImg image={image} />
        <div className="seller-info tracking-wide">
          {!session && (
            <>
              <p className="font-bold text-xl text-slate-800 mb-2">{name}</p>
              <div className="mt-3">
                <Button style="btn btn-primary px-4" link="/contact">
                  Contact
                </Button>
              </div>
            </>
          )}
          {session && <SellerDetails user={user} address={address} />}
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
