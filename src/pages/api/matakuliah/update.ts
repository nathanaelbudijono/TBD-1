import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export default async function UpdateHandler(
  res: NextApiResponse,
  req: NextApiRequest
) {
  const slug = req.query.slug as string;
  const token = req.cookies.token as string;
  const { id, mataKuliah } = req.body;
  try {
    jwt.verify(
      token.substring(1, token.length - 1),
      process.env.TOKEN_SECRET as string,
      {},
      async (err, token) => {
        if (err) {
          throw err;
        } else {
          const rows = await prisma.mATA_KULIAH.update({
            where: {
              ID_MK: slug,
            },
            data: {
              ID_MK: id,
              NAME_MK: mataKuliah,
            },
          });
          return res.status(200).json({ rows });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "There is no token" });
  }
}
