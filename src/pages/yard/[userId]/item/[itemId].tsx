import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';

type Props = {};

const EditItem = (props: Props) => {
  const router = useRouter();
  const { itemId } = router.query;

  return (
    <Layout>
      <div>Editing item {itemId}</div>
    </Layout>
  );
};

export default EditItem;
