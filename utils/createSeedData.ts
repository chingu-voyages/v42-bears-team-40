const { faker } = require('@faker-js/faker');

const createItem = () => {
  const categoryOptions = faker.helpers.arrayElements([]);
  const statusOptions = faker.helpers.arrayElements([
    'available',
    'pending',
    'sold',
  ]);
  const status =
    statusOptions[Math.floor(Math.random() * statusOptions.length)];
  const category =
    categoryOptions[Math.floor(Math.random() * categoryOptions.length)];
  return {
    itemId: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    picture: faker.image.image(),
    price: faker.commerce.price(100, 200, 0),
    status,
    category,
    userId: 'need to fill',
  };
};

export const createSeedItems = () => {
  const items = [];
  Array.from({ length: 20 }).forEach(() => {
    items.push(createItem());
  });

  return items;
};

const seedItems = createSeedItems();
console.log(seedItems);
