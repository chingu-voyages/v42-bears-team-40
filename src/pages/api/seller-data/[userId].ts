import { prisma } from '../../../server/db';

// GET /api/seller-data/:[userId]
// Get Seller Name, Email, and Address
export default async function handler(req, res) {
  const userId = req.query.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  let address = await prisma.address.findFirst({
    where: {
      userId: userId,
    },
  });
  if (!address) address = undefined;
  res.send({ user, address });
}
