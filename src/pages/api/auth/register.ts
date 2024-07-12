import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import connectDatabase from "@/utils/connect";
import { User } from "@/models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDatabase();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res
      .status(400)
      .json({ message: "name, username, email, and password are required" });
  }

  try {
    // Check if user already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res
        .status(409)
        .json({ message: "User with this username already exists" });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      username,
      email,
      passwordHash,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
}
