import Layout from '../../components/Layout';
import ContactForm from '../../components/ContactForm';
import { User } from '@prisma/client';
import { ItemType } from '../../components/Item';

type ContactProps = {
  user: User;
  items: ItemType[];
};

const Contact = ({ user, items }: ContactProps) => {
  return (
    <Layout>
      <ContactForm user={user} items={items} />
    </Layout>
  );
};

export default Contact;

export async function getServerSideProps({ params }) {
  const userId = String(params?.sellerId);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  const items = await prisma.item.findMany({
    where: {
      userId: userId,
    },
  });
  return {
    props: { user, items },
  };
}
