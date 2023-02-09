import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';
import { useSession } from 'next-auth/react';
import ItemForm from '../../../../components/ItemForm';

const AddItem: React.FC = () => {
  const { data: session } = useSession();
  const id = session?.user?.id;
  const router = useRouter();
  const { userId } = router.query;
  if (userId !== id) {
    router.push('/');
  }

  const initialItem = {
    title: '',
    description: '',
    picture: '',
    category: '',
    price: '',
  };

  const [itemForm, setItemForm] = useState(initialItem);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemForm({
      ...itemForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitData = async (e: React.SyntheticEvent) => {
    let price = Number(itemForm.price);
    e.preventDefault();
    try {
      const body = { ...itemForm, price };
      console.log('submitting', body);
      await fetch('/api/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push(`/yard/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(itemForm);
  return (
    <Layout>
      <ItemForm
        formChange={handleOnChange}
        handleSubmitForm={submitData}
        formData={itemForm}
      />
    </Layout>
  );
};

export default AddItem;
