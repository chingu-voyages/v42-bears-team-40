import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Layout from '../../../../components/Layout';
import ItemForm from '../../../../components/ItemForm';
import { handleImagePhoto } from '../../../../utils/updatePhoto';
import {
  handleAlertSuccess,
  handleAlertDanger,
} from '../../../../utils/handleAlert';

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

  const submitData = async (
    e: React.SyntheticEvent,
    imageRef,
    setAlertType,
    setMessage,
    setShowAlert
  ) => {
    e.preventDefault();
    let price = Number(itemForm.price);
    const body = { ...itemForm, price };
    try {
      const response = await fetch('/api/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const { itemId } = await response.json();
      await handleImagePhoto(imageRef, itemId);
      handleAlertSuccess(
        setAlertType,
        setMessage,
        setShowAlert,
        'Item successfully added!'
      );
      setTimeout(() => Router.push(`/yard/${id}`), 3000);
    } catch (error) {
      handleAlertDanger(
        setAlertType,
        setMessage,
        setShowAlert,
        'There was an issue adding your item'
      );
      console.log(error);
    }
  };

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
