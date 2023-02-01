import { User, Address } from '@prisma/client';
import Layout from '../../../components/Layout';
import SellerInfo from '../../../components/SellerInfo';
import { prisma } from '../../../server/db';

type YardProps = {
  user: User;
  address?: Address;
};

const Yard = ({ user, address }: YardProps) => {
  return (
    <Layout>
      <SellerInfo user={user} address={address} />
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
  return {
    props: { user, address },
  };
}
