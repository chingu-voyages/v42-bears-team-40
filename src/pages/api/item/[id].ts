import { prisma } from '../../../server/db';

export default async function handleItem(req, res) {
  const itemId = req.query.id;
  const { type } = req.body;

  if (req.method === 'PUT') {
    if (type === 'update-item') {
      const { title, description, price, category, status } = req.body.item;
      try {
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
      } catch (error) {
        console.error(error);
      }
    }

    if (type === 'update-item-image') {
      const { picture } = req.body;
      try {
        const item = await prisma.item.update({
          where: { itemId },
          data: {
            picture,
          },
        });
        res.json({ item });
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deletedItem = await prisma.item.delete({
        where: {
          itemId,
        },
      });
      res.json(deletedItem);
    } catch (error) {
      console.error(error);
    }
  }
}
