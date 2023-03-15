import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);

const { Schema } = mongoose;

const memberSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    phone: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(),
    },
    position: {
      type: String,
      required: true,
    },
    socialLinks: {
      linkedin: String,
      twitter: String,
      facebook: String,
      instagram: String,
    },
    featuredImage: {
      type: String,
      required: true,
      default: "https://via.placeholder.com/300x300.jpg?text=tmptechnology.vn",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.id;
      },
    },
  }
);

const Member = mongoose.model("Member", memberSchema);
export { Member };
