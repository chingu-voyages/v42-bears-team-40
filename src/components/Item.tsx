import Link from 'next/link';
import { useSession } from 'next-auth/react';

export type ItemType = {
  itemId: string;
  title: string;
  description: string;
  picture: string;
  price: number;
  status: 'available' | 'pending' | 'sold';
  category: string;
  userId: string;
};

type ItemProps = {
  item: ItemType;
};

const Item = ({ item }: ItemProps) => {
  const { itemId, title, picture, description, price, category, userId } = item;
  const { data: session } = useSession();

  return (
    <div className='item-card w-72 border shadow-lg rounded-lg sm:m-0 overflow-hidden group'>
      <div className='w-full drop-shadow-sm flex items-center justify-center h-80 relative group'>
        <img
          className='absolute object-cover h-full w-full group-hover:opacity-20'
          src={picture}
          alt={title}
        />
        <div className='card-hover relative mx-4 flex-col text-center opacity-0 group-hover:opacity-100'>
          <div className='card-description'>
            <p className='mb-4 font-medium'>{description}</p>
          </div>
          {session ? (
            <Link
              className='btn btn-primary block mx-auto'
              href={`/yard/${userId}/item/${itemId}`}
            >
              Edit Item
            </Link>
          ) : (
            <Link
              className='btn btn-primary block mx-auto'
              href={`/yard/${userId}`}
            >
              View Yard
            </Link>
          )}
        </div>
      </div>
      <div className='item-info bg-gray-100'>
        <div className='item-header p-4'>
          <div className='flex justify-between'>
            <div>
              <div className='font-bold text-lg text-slate-700 tracking-wide'>
                {title}
              </div>
              <div className='text-slate-500 tracking-wide text-sm'>
                {category}
              </div>
            </div>
            <div className='font-bold text-slate-800'>${price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
