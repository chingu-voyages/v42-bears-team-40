import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { prisma } from '../server/db';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
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
  const [filteredItems, setFilteredItems] = useState([]);
  const handleSearch = (searchTerm) => {
    setFilteredItems(
      props.items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };
  return (
    <Layout>
      <section className='item-section grid justify-center'>
        <SearchBar handleSearch={handleSearch} />
        <div className='item-section-center'>
          {filteredItems.length > 0 &&
            filteredItems.map((singleItem) => (
              <Item key={singleItem.itemId} item={singleItem} />
            ))}
          {filteredItems.length == 0 &&
            props.items.map((singleItem) => (
              <Item key={singleItem.itemId} item={singleItem} />
            ))}
        </div>
      </section>
    </Layout>
  );
};
export default Search;
