import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Item from "../components/Item";
import { ItemType } from "../components/Item";

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
            <Item key={singleItem.itemId} item={singleItem} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Search;
