// import { prisma } from '../../../server/db';

// PUT api/item/:id
// Update Item
export default async function editItem(req, res) {
  const itemId = req.query.id;
  const { title, description, picture, price, category, status } = req.body;
  console.log('from backend itemId', itemId);

  const item = await prisma.item.update({
    where: { itemId: itemId },
    data: {
      title,
      description,
      picture,
      price,
      category,
      status,
    },
  });
  res.json(item);
}
