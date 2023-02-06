import Image from 'next/image';
import userAvatar from '../styles/images/user-avatar.png';

type Props = {
  image?: string;
  hidden: boolean;
};

const SellerImg = ({ image, hidden }: Props) => {
  return (
    <div
      className={
        hidden
          ? 'hidden'
          : 'seller-img h-24 w-24 md:h-36 md:w-36 bg-slate-200 rounded-full flex justify-center items-center mr-6'
      }
    >
      {image ? (
        <Image
          className="w-full h-full max-w-36 max-h-36 object-cover rounded-full overflow-hidden"
          src={image}
          alt="Seller Picture"
          width={144}
          height={144}
        />
      ) : (
        <img
          className="w-full h-3/4 object-cover"
          src={userAvatar.src}
          alt="Default"
        />
      )}
    </div>
  );
};

export default SellerImg;
