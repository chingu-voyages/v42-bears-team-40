import { useState, useEffect } from 'react';
import Router from 'next/router';
import Layout from '../../../../components/Layout';
import { ItemType } from '../../../../components/Item';
import { prisma } from '../../../../server/db';
import { useSession } from 'next-auth/react';
import ItemForm from '../../../../components/ItemForm';

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
    price: price || '',
    picture: picture || '',
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

  const submitItem = async (e) => {
    e.preventDefault();
    let price = Number(itemForm.price);
    const body = {
      ...itemForm,
      price,
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
