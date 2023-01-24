import Link from 'next/link';

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

  return (
    <div className='item-card border shadow-lg rounded-lg m-6 sm:m-0 overflow-hidden'>
      <div className='w-full drop-shadow-sm '>
        <img className='object-cover h-80 w-full' src={picture} alt={title} />
      </div>
      <div className='item-info'>
        <div className='item-header p-4'>
          <div className='flex justify-between pb-4'>
            <div>
              <div className='font-bold text-lg text-slate-700 tracking-wide'>
                {title}
              </div>
              <div className='text-slate-500 tracking-wide text-sm'>
                {category}
              </div>
              {/* option to add description */}
              {/* <div className='card-description'>
                <p>{description}</p>
              </div> */}
            </div>
            <div className='font-bold text-slate-800'>${price}</div>
          </div>
          <div className='flex justify-evenly'>
            <Link className='btn btn-primary' href={'Add link later'}>
              Contact
            </Link>
            <Link className='btn btn-secondary' href={'Add link later'}>
              View Yard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
