import { prisma } from '../../../server/db';

// POST api/seller-address/
// Create Seller Address
export default async function handle(req, res) {
  const { id, address, city, state, zipCode } = req.body;
  try {
    const sellerAddress = await prisma.address.create({
      data: {
        address,
        city,
        state,
        zipCode: Number(zipCode),
        userId: id,
      },
    });
    res.send(sellerAddress);
  } catch (error) {
    console.log(error);
  }
}
