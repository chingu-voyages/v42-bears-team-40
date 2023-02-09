import { prisma } from '../../../server/db';

// PUT /api/item-image/:itemId
// Update item image
export default async function handle(req, res) {
  const newImage = req.body;
  const itemId = req.query.itemId;

  try {
    const item = await prisma.item.update({
      where: { itemId },
      data: {
        picture: newImage,
      },
    });
    res.json({ item });
  } catch (error) {
    console.log(error);
  }
}
