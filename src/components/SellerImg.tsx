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
          : 'seller-img md:h-36 md:w-36 bg-slate-200 rounded-full grid justify-center items-center mr-6'
      }
    >
      {image ? (
        <img
          className="w-full h-full object-cover rounded-full"
          src={image}
          alt="Seller Picture"
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
