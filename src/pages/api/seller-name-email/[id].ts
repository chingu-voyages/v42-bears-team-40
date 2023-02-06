import { prisma } from '../../../server/db';

// PUT /api/seller-name-email/:id
export default async function handle(req, res) {
  const { name, email } = req.body;
  const userId = req.query.id;
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
      },
    });
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
}
