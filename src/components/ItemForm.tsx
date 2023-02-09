import { useRouter } from 'next/router';

type Props = {
  formChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitForm: (e: React.SyntheticEvent) => Promise<void>;
  formData: {
    itemId?: string;
    title: string;
    description: string;
    price: string | number;
    picture: string;
    status?: 'available' | 'pending' | 'sold';
    category: string;
  };
};

const ItemForm = ({ formChange, handleSubmitForm, formData }: Props) => {
  const router = useRouter();
  const isEditing = !router.pathname.includes('add-item');
  return (
    <div className='flex flex-auto flex-col items-center'>
      <h2 className='text-2l font-bold'>
        {isEditing ? 'Edit your Item' : 'Add An Item'}
      </h2>
      <form className='p-4 border border-violet-600 rounded-lg flex flex-col items-center justify-center'>
        <div className=' flex-row '>
          <label>Item Name</label>
          <input
            className='form-item'
            onChange={formChange}
            type='text'
            name='title'
            value={formData.title}
          />
        </div>
        <div className='flex-row '>
          <label>Description</label>
          <input
            className='form-item'
            onChange={formChange}
            type='text'
            name='description'
            value={formData.description}
          />
        </div>
        <div className='flex-row'>
          <label>Image</label>
          <input
            className='form-item'
            onChange={formChange}
            type='text'
            placeholder='Can be left empty'
            name='picture'
            value={formData.picture}
          />
        </div>
        <div className='flex-row'>
          <label>Price</label>
          <input
            className='form-item'
            onChange={formChange}
            type='text'
            name='price'
            value={formData.price}
          />
        </div>
        <div className='flex-row'>
          <label>Category</label>
          <input
            className='form-item'
            onChange={formChange}
            type='text'
            name='category'
            value={formData.category}
          />
        </div>
        {isEditing && (
          <div className='flex-row'>
            <label>Status</label>
            <input
              className='form-item'
              onChange={formChange}
              type='radio'
              name='status'
              value='available'
              checked={formData.status === 'available'}
            />
            <label>Available</label>
            <input
              className='form-item'
              onChange={formChange}
              type='radio'
              value='pending'
              name='status'
              checked={formData.status === 'pending'}
            />
            <label>Pending</label>
            <input
              className='form-item'
              onChange={formChange}
              type='radio'
              value='sold'
              name='status'
              checked={formData.status === 'sold'}
            />
            <label>Sold</label>
          </div>
        )}
        <button
          className='btn btn-primary m-2'
          type='submit'
          onClick={handleSubmitForm}
        >
          {isEditing ? 'Edit Item' : 'Add Item'}
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
