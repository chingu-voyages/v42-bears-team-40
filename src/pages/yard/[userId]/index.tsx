import { User, Address } from '@prisma/client';
import Layout from '../../../components/Layout';
import SellerInfo from '../../../components/SellerInfo';
import { ItemType } from '../../../components/Item';
import Item from '../../../components/Item';
import { prisma } from '../../../server/db';

type YardProps = {
  user: User;
  address?: Address;
  items: ItemType[];
};

const Yard = ({ user, address, items }: YardProps) => {
  return (
    <Layout>
      <SellerInfo user={user} address={address} />
      <section className="item-section grid justify-center ">
        <div className="item-section-center">
          {items.map((singleItem) => (
            <div key={singleItem.itemId} className="flex justify-center">
              <Item item={singleItem} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Yard;

export async function getServerSideProps({ params }) {
  const userId = String(params?.userId);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  const address = await prisma.address.findFirst({
    where: {
      userId: userId,
    },
  });
  const items = await prisma.item.findMany({
    where: {
      userId: userId,
    },
  });
  return {
    props: { user, address, items },
  };
}
