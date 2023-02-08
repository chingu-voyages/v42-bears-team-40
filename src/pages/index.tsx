import { GetStaticProps } from 'next';
import { prisma } from '../server/db';
import Layout from '../components/Layout';
import Item from '../components/Item';
import { ItemType } from '../components/Item';

export const getStaticProps: GetStaticProps = async () => {
  const items = await prisma.item.findMany();
  return {
    props: { items },
  };
};
type Props = {
  items: ItemType[];
};
const Search: React.FC<Props> = (props) => {
  return (
    <Layout>
      <section className="item-section grid justify-center">
        <div className="item-section-center">
          {props.items.map((singleItem) => (
            <div key={singleItem.itemId} className="flex justify-center">
              <Item item={singleItem} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Search;
