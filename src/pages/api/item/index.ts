import { getSession } from 'next-auth/react';
import { prisma } from '../../../server/db';

export default async function createItem(req, res) {
  const { title, description, picture, priceNumber, category } = req.body;
  const session = await getSession({ req });
  const result = await prisma.item.create({
    data: {
      title,
      description,
      picture,
      price: priceNumber,
      category,
      user: { connect: { id: session?.user?.id } },
    },
  });
  res.json(result);
}
