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
  const notComplete =
    formData.title === '' || formData.price === '' || formData.category === '';

  return (
    <div className='form-center'>
      <div className='bg-gray-ish py-4 rounded-lg drop-shadow-lg text-slate-700'>
        <h3 className='text-2xl tracking-wide mb-4 font-semibold'>
          {isEditing ? 'Edit your Item' : 'Add An Item'}
        </h3>
        <form className='w-9/12 mx-auto'>
          <div className='text-left'>
            <label className='font-semibold text-lg'>
              Name<span className='text-red-700'>*</span>
            </label>
            <input
              className='form-input w-full text-slate-800'
              onChange={formChange}
              type='text'
              name='title'
              value={formData.title}
            />
          </div>
          <div className='text-left'>
            <label className='font-semibold text-lg'>
              Price<span className='text-red-700'>*</span>
            </label>
            <input
              className='form-input w-full text-slate-800'
              onChange={formChange}
              type='text'
              name='price'
              value={formData.price}
            />
          </div>
          <div className='text-left'>
            <label className='font-semibold text-lg'>
              Category<span className='text-red-700'>*</span>
            </label>
            <input
              className='form-input w-full text-slate-800'
              onChange={formChange}
              type='text'
              name='category'
              value={formData.category}
            />
          </div>
          <div className='text-left'>
            <label className='font-semibold text-lg'>Description</label>
            <input
              className='form-input w-full text-slate-800'
              onChange={formChange}
              type='text'
              name='description'
              value={formData.description}
            />
          </div>
          <div className='text-left'>
            <label className='font-semibold text-lg'>Image</label>
            <input
              className='form-input w-full text-slate-800'
              onChange={formChange}
              type='text'
              name='picture'
              value={formData.picture}
            />
          </div>
          {isEditing && (
            <div className='flex-row text-left my-6'>
              <label className='font-semibold text-lg mr-4'>Status</label>
              <input
                className='m-1'
                onChange={formChange}
                type='radio'
                name='status'
                value='available'
                checked={formData.status === 'available'}
              />
              <label>Available</label>
              <input
                className='m-1 ml-4'
                onChange={formChange}
                type='radio'
                value='pending'
                name='status'
                checked={formData.status === 'pending'}
              />
              <label>Pending</label>
              <input
                className='m-1 ml-4'
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
            className={
              notComplete
                ? 'btn btn-primary m-2 opacity-70 bg-slate-400 hover:bg-slate-400'
                : 'btn btn-primary m-2'
            }
            type='submit'
            onClick={handleSubmitForm}
            disabled={notComplete}
          >
            {isEditing ? 'Edit Item' : 'Add Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
