import * as mongoose from 'mongoose';

const akaImgSchema = new mongoose.Schema(
  {
    personalNumber: { type: String, unique: true },
    path: String,
    format: String,
    takenAt: Date,
  },
  { timestamps: true, versionKey: false }
);

export default akaImgSchema;
