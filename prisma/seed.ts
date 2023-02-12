import { PrismaClient, Item } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { seedData } from '../utils/data';

const prisma = new PrismaClient();

async function main() {
  await prisma.item.deleteMany({});
  const items: Item[] = [];

  const userIdOptions = [
    'cldt7aeh80000s4tlqapgqen2',
    'cldt835qf000amg08n1ysuczt',
    'cldvuucug0000s4ap5lwx4e96',
    'cldvuwz490003s4apffhkgfdk',
  ];

  const getRandom = (options) => {
    return options[Math.floor(Math.random() * options.length)];
  };

  seedData.forEach((item) => {
    const newItem: Item = {
      itemId: faker.datatype.uuid(),
      title: item.title,
      description: faker.commerce.productDescription(),
      picture: item.picture,
      price: Number(faker.commerce.price(100, 200, 0)),
      status: item.status,
      category: item.category,
      userId: getRandom(userIdOptions),
    };
    items.push(newItem);
  });

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
