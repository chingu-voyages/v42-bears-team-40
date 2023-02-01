import { getSession } from "next-auth/react";
import { prisma } from "../../../server/db";

export default async function createItem(req, res) {
  const { title, description, picture, price, category } = req.body;
  const session = await getSession({ req });
  const result = await prisma.item.create({
    data: {
      title: title,
      description: description,
      picture: picture,
      price: price,
      category: category,
      user: { connect: { id: session?.user?.id } },
    },
  });
  res.json(result);
}
