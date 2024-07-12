import { Schema, model, Document } from "mongoose";
import { CommentSchema, IComment } from "./comments";
import { VersionSchema, IVersion } from "./version";

export interface ISnippet extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  description?: string;
  language: string;
  code: string;
  tags: string[];
  visibility: "public" | "private";
  forkCount: number;
  forkedFrom?: Schema.Types.ObjectId;
  comments: IComment[];
  likes: Schema.Types.ObjectId[];
  lastAccessed?: Date;
  references: string[];
  versionHistory: IVersion[];
  usageCount: number;
  lastUsed?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SnippetSchema = new Schema<ISnippet>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  language: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },
  forkCount: {
    type: Number,
    default: 0,
  },
  forkedFrom: {
    type: Schema.Types.ObjectId,
    ref: "Snippet",
  },
  comments: [CommentSchema],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  lastAccessed: {
    type: Date,
  },
  references: [
    {
      type: String,
    },
  ],
  versionHistory: [VersionSchema],
  usageCount: {
    type: Number,
    default: 0,
  },
  lastUsed: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Snippet = model<ISnippet>("Snippet", SnippetSchema);

export { Snippet };
