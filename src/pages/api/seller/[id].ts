import { prisma } from '../../../server/db';

export default async function handle(req, res) {
  const userId = req.query.id;
  const type = req.body.type;
  console.log(type);

  // GET seller and seller's address
  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          address: true,
        },
      });
      res.send({ user });
    } catch (error) {
      console.error(error);
    }
  }

  // POST new seller address
  if (req.method === 'POST') {
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

  // PUT seller name and email
  if (req.method === 'PUT') {
    if (type === 'update-profile') {
      const { name, email } = req.body.userForm;
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

    // PUT seller address
    if (type === 'update-address') {
      const { address, city, state, zipCode } = req.body;
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

    // PUT seller profile image
    if (type === 'update-image') {
      const { image } = req.body;
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
  }
}
