import { Schema, model, Document } from "mongoose";

export interface IVersion extends Document {
  versionId: string;
  code: string;
  updatedAt: Date;
}

const VersionSchema = new Schema<IVersion>({
  versionId: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Version = model<IVersion>("Version", VersionSchema);

export { VersionSchema, Version };
