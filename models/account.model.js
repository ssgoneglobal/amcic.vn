import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { accountTypeEnum } from "../enums/accountType.enum.js";
import { accountStatusEnum } from "../enums/accountStatus.enum.js";

const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    profile: {
      fullName: {
        type: String,
        default: "",
      },
      dateOfBirth: {
        type: Date,
      },
      avatar: {
        type: String,
        default:
          "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg",
      },
      email: {
        type: String,
      },
    },
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      select: true,
    },
    type: {
      type: Number,
      enum: Object.values(accountTypeEnum),
      default: accountTypeEnum.MEMBER,
    },
    authentication: {
      lock: { type: Boolean, default: false },
      isChanged: {
        type: Boolean,
        default: false,
      },
      status: { type: Boolean, default: false },
      isCreatedPassword: { type: Boolean, default: false },
      ip: { type: String },
      recentSMSOTP: { type: Date },
      location: { type: Object },
      isPhoneVerified: { type: Boolean, default: false, required: true },
    },
    unreadNotifications: { type: Number, default: 0 },
    status: {
      type: Number,
      enum: Object.values(accountStatusEnum),
      default: accountStatusEnum.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.id;
        delete ret.password;
      },
    },
  }
);

accountSchema.methods = {
  comparePassword(password) {
    return bcrypt.compare(password, this.password);
  },
};

const Account = mongoose.model("Account", accountSchema);
export { Account };
