import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { prisma } from '../server/db';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import Category from '../components/Category';
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
  const [currentCategory, setCurrentCategory] = useState('all');
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
  const handleCategoryFiltering = (currentCategory) => {
    if (currentCategory !== '' || currentCategory !== 'all')
      setFilteredItems(
        props.items.filter((item) => item.category === currentCategory)
      );
    setCurrentCategory('all');
  };

  return (
    <Layout>
      <section className='item-section grid justify-center'>
        <div className='flex flex-col md:flex-row md:justify-around pb-4'>
          <SearchBar handleSearch={handleSearch} />
          <Category
            setCategory={setCurrentCategory}
            handleCategoryFiltering={handleCategoryFiltering}
          />
        </div>
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
