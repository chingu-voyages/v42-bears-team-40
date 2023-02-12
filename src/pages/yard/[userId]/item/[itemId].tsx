import { useState, useEffect } from 'react';
import Router from 'next/router';
import Layout from '../../../../components/Layout';
import { ItemType } from '../../../../components/Item';
import { prisma } from '../../../../server/db';
import { useSession } from 'next-auth/react';
import ItemForm from '../../../../components/ItemForm';
import { handleImagePhoto } from '../../../../utils/updatePhoto';
import {
  handleAlertSuccess,
  handleAlertDanger,
} from '../../../../utils/handleAlert';

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
  const { title, description, price, status, category, itemId, userId } = item;
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
    price: price || '',
    status,
    category,
  };

  const [itemForm, setItemForm] = useState(initialItem);

  const handleOnChange = (e) => {
    setItemForm({
      ...itemForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitItem = async (
    e: React.SyntheticEvent,
    imageRef,
    setAlertType,
    setMessage,
    setShowAlert
  ) => {
    e.preventDefault();
    let price = Number(itemForm.price);
    const item = { ...itemForm, price };
    try {
      const response = await fetch(`/api/item/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item, type: 'update-item' }),
      });
      const updatedItem = await response.json();
      await handleImagePhoto(imageRef, updatedItem.itemId);
      handleAlertSuccess(
        setAlertType,
        setMessage,
        setShowAlert,
        'Item successfully edited!'
      );
      setTimeout(() => Router.push(`/yard/${userId}`), 3000);
    } catch (error) {
      handleAlertDanger(
        setAlertType,
        setMessage,
        setShowAlert,
        'There was an issue editing your item'
      );
      console.log(error);
    }
  };

  return (
    <Layout>
      <ItemForm
        formChange={handleOnChange}
        handleSubmitForm={submitItem}
        formData={itemForm}
      />
    </Layout>
  );
};

export default EditItem;
