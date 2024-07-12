import { Schema, model, models, Document } from "mongoose";

export interface IComment extends Document {
  userId: Schema.Types.ObjectId;
  comment: string;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = models.Comment || model<IComment>("Comment", CommentSchema);

export { CommentSchema, Comment };
