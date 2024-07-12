import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  name?: string;
  profilePicture?: string;
  bio?: string;
  role: "user" | "admin";
  preferences: {
    theme: "dark" | "light";
    notifications: boolean;
  };
  followers: Schema.Types.ObjectId[];
  following: Schema.Types.ObjectId[];
  createdSnippetsCount: number;
  favoriteSnippets: Schema.Types.ObjectId[];
  frequentlyUsedSnippets: Schema.Types.ObjectId[];
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
  },
  name: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  bio: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  preferences: {
    theme: {
      type: String,
      enum: ["dark", "light"],
      default: "dark",
    },
    notifications: {
      type: Boolean,
      default: true,
    },
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdSnippetsCount: {
    type: Number,
    default: 0,
  },
  favoriteSnippets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Snippet",
    },
  ],
  frequentlyUsedSnippets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Snippet",
    },
  ],
  lastLogin: {
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

const User = models.User || model<IUser>("User", UserSchema);

export { User };
