import { prisma } from '../../../server/db';

// PUT /api/seller-image/:id
// Update seller image
export default async function handle(req, res) {
  const image = req.body;
  const userId = req.query.id;
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        image,
      },
    });
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
}
