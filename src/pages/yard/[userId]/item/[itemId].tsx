import { useState, useEffect } from 'react';
import Router from 'next/router';
import Layout from '../../../../components/Layout';
import { ItemType } from '../../../../components/Item';
import { prisma } from '../../../../server/db';
import { useSession } from 'next-auth/react';

type ItemProps = {
  item: ItemType;
};
export async function getServerSideProps({ params }) {
  const itemId = String(params?.itemId);
  const item = await prisma.item.findFirst({
    where: {
      itemId: itemId,
    },
  });
  return {
    props: { item },
  };
}
const EditItem: React.FC = ({ item }: ItemProps) => {
  const {
    title,
    description,
    price,
    picture,
    status,
    category,
    itemId,
    userId,
  } = item;

  const { data: session } = useSession();

  useEffect(() => {
    const id = session?.user?.id;
    if (userId !== id) {
      Router.push('/');
    }
  }, []);

  const initialItem = {
    itemId,
    title,
    description: description || '',
    price: price || 0,
    picture: picture || '',
    status,
    category,
  };

  const [itemForm, setItemForm] = useState(initialItem);

  const handleOnChange = (e) => {
    e.preventDefault();
    setItemForm({
      ...itemForm,
      [e.target.name]: e.target.value,
    });
  };
  const handlePrice = (e) => {
    e.preventDefault();
    let price = Number(e.target.value);
    console.log(price);
    setItemForm({
      ...itemForm,
      price: price,
    });
  };
  const handleStatus = (e) => {
    let status = e.target.value;
    console.log('e.target.value', status);
    setItemForm({
      ...itemForm,
      status: status,
    });
  };
  const submitItem = (e) => {
    e.preventDefault();
    saveEditedItem(itemForm);
  };
  async function saveEditedItem(itemForm): Promise<void> {
    const body = {
      ...itemForm,
    };
    try {
      await fetch(`/api/item/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
      Router.push(`/yard/${userId}`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
      <div className='flex flex-auto flex-col items-center'>
        <h2 className='text-2l font-bold'>Edit An Item</h2>
        <form className='p-4 border border-violet-600 rounded-lg flex flex-col items-center justify-center'>
          <div className=' flex-row '>
            <label>Item Name</label>
            <input
              className='form-item'
              onChange={(e) => handleOnChange(e)}
              type='text'
              value={itemForm.title}
              name='title'
            />
          </div>
          <div className='flex-row '>
            <label>Description</label>
            <input
              className='form-item'
              onChange={(e) => handleOnChange(e)}
              type='text'
              placeholder='Can be left empty'
              value={itemForm.description}
              name='description'
            />
          </div>
          <div className='flex-row'>
            <label>Image</label>
            <input
              className='form-item'
              onChange={(e) => handleOnChange(e)}
              type='text'
              placeholder='Can be left empty'
              value={itemForm.picture}
              name='picture'
            />
          </div>
          <div className='flex-row'>
            <label>Price</label>
            <input
              className='form-item'
              onChange={(e) => handlePrice(e)}
              type='text'
              value={itemForm.price}
              name='price'
            />
          </div>
          <div className='flex-row'>
            <label>Category</label>
            <input
              className='form-item'
              onChange={(e) => handleOnChange(e)}
              type='text'
              value={itemForm.category}
              name='category'
            />
          </div>
          <div className='flex-row'>
            <label>Status</label>
            <input
              className='form-item'
              onChange={(e) => handleStatus(e)}
              type='radio'
              name='status'
              value='available'
              checked={itemForm.status === 'available'}
            />
            <label>Available</label>
            <input
              className='form-item'
              onChange={(e) => handleStatus(e)}
              type='radio'
              value='pending'
              name='status'
              checked={itemForm.status === 'pending'}
            />
            <label>Pending</label>
            <input
              className='form-item'
              onChange={(e) => handleStatus(e)}
              type='radio'
              value='sold'
              name='status'
              checked={itemForm.status === 'sold'}
            />
            <label>Sold</label>
          </div>
          <button
            className='btn btn-primary m-2'
            type='submit'
            onClick={(e) => submitItem(e)}
          >
            Edit Item
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditItem;
