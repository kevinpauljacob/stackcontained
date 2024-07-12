import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";

export async function authenticate(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req: req });

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return false;
  }

  return true;
}
