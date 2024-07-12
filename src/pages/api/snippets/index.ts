// pages/api/snippets/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import connectDatabase from "@/utils/connect";
import { Snippet } from "@/models/snippet";
import { authenticate } from "@/utils/authenticate";

// Function to handle POST requests
async function handleCreateSnippet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const activeSession = await authenticate(req, res);
    if (!activeSession) {
      return res
        .status(401)
        .json({ message: "No authenticated session available" });
    }

    const { userId, title, description, language, code, tags, visibility } =
      req.body;

    if (!userId || !title || !language || !code) {
      return res
        .status(400)
        .json({ message: "Title, language, and code are required" });
    }

    const newSnippet = new Snippet({
      userId,
      title,
      description,
      language,
      code,
      tags,
      visibility,
    });

    await newSnippet.save();

    return res.status(201).json({ message: "Snippet created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handleGetUserSnippets(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const activeSession = await authenticate(req, res);
    if (!activeSession) {
      return res
        .status(401)
        .json({ message: "No authenticated session available" });
    }

    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const snippets = await Snippet.find({ userId }).exec();
    return res.status(200).json(snippets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handleGetAllSnippets(req: NextApiRequest, res: NextApiResponse) {
  try {
    const activeSession = await authenticate(req, res);
    if (!activeSession) {
      return res
        .status(401)
        .json({ message: "No authenticated session available" });
    }

    const snippets = await Snippet.find().exec();
    return res.status(200).json(snippets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDatabase();

  if (req.method === "GET") {
    const { userId } = req.query;
    if (userId) {
      return handleGetUserSnippets(req, res);
    } else {
      return handleGetAllSnippets(req, res);
    }
  } else if (req.method === "POST") {
    return handleCreateSnippet(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
