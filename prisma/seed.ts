import { ItemType } from './../src/components/Item';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.item.deleteMany({});
  const items: ItemType[] = [];

  const numOfItems = 50;
  const categoryOptions = faker.helpers.arrayElements([
    'books',
    'clothing',
    'crafts',
    'electronics',
    'furniture',
    'games',
    'kitchen',
    'movies',
    'music',
    'other',
    'outdoors',
    'sports',
    'toys',
  ]);
  const statusOptions = faker.helpers.arrayElements([
    'available',
    'pending',
    'sold',
  ]);
  const userIdOptions = [
    'cldt7aeh80000s4tlqapgqen2',
    'cldt835qf000amg08n1ysuczt',
    'cldvuucug0000s4ap5lwx4e96',
    'cldvuwz490003s4apffhkgfdk',
  ];

  const getRandom = (options) => {
    return options[Math.floor(Math.random() * options.length)];
  };

  for (let i = 0; i < numOfItems; i++) {
    const item: ItemType = {
      itemId: faker.datatype.uuid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      picture: faker.image.image(undefined, undefined, true),
      price: Number(faker.commerce.price(100, 200, 0)),
      status: getRandom(statusOptions),
      category: getRandom(categoryOptions),
      userId: getRandom(userIdOptions),
    };
    items.push(item);
  }

  const addItems = async () => await prisma.item.createMany({ data: items });
  addItems();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
