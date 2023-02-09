import { getSession } from 'next-auth/react';
import { prisma } from '../../../server/db';

// POST api/item/
// Create Item
export default async function createItem(req, res) {
  const { title, description, price, category } = req.body;
  const session = await getSession({ req });
  const result = await prisma.item.create({
    data: {
      title,
      description,
      price,
      category,
      user: { connect: { id: session?.user?.id } },
    },
  });
  res.json(result);
}
