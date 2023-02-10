// import { prisma } from '../../../server/db';

// PUT api/item/:id
// Update Item
export default async function editItem(req, res) {
  const itemId = req.query.id;
  const { title, description, price, category, status } = JSON.parse(req.body);

  const item = await prisma.item.update({
    where: { itemId: itemId },
    data: {
      title,
      description,
      price,
      category,
      status,
    },
  });
  res.json(item);
}
