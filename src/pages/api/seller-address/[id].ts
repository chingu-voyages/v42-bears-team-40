import { prisma } from '../../../server/db';

// PUT api/seller-address/:id
// Update Seller Address
export default async function handler(req, res) {
  const { address, city, state, zipCode } = req.body;
  const userId = req.query.id;
  try {
    const sellerAddress = await prisma.address.updateMany({
      where: { userId: userId },
      data: {
        address,
        city,
        state,
        zipCode: Number(zipCode),
      },
    });
    res.send(sellerAddress);
  } catch (error) {
    console.log(error);
  }
}
