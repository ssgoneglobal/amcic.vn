import { nanoid } from "nanoid";

import * as csv from "fast-csv";
import bcrypt from "bcryptjs";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";
import async from "async";
import dotenv from "dotenv-safe";
import { Category } from "../models/category.model.js";
import { Account } from "../models/account.model.js";
import { Tag } from "../models/tag.model.js";

import libphonenum from "google-libphonenumber";
import subVn from "sub-vi";

const { PhoneNumberFormat, PhoneNumberUtil } = libphonenum;

const phoneUtil = PhoneNumberUtil.getInstance();

import mongoose from "mongoose";
// import * as data from './data.json';
import { readFile } from "fs/promises";
import { accountTypeEnum } from "../enums/accountType.enum.js";
import { accountStatusEnum } from "../enums/accountStatus.enum.js";
import { ContactMessage } from "../models/contactMessage.model.js";
const importCategories = JSON.parse(
  await readFile(new URL("./category.json", import.meta.url))
);
const importTags = JSON.parse(
  await readFile(new URL("./tag.json", import.meta.url))
);
//

faker.setLocale("vi");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "../.env"),
  example: path.join(__dirname, "../.env.example"),
});

const vars = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  mongo: {
    uri:
      process.env.NODE_ENV === "development"
        ? process.env.MONGO_URI_TESTS
        : process.env.MONGO_URI,
  },
  logs: process.env.NODE_ENV === "production" ? "combined" : "dev",
};

mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

if (vars.env === "development") {
  mongoose.set("debug", false);
}

const migrateData = async () => {
  await Account.deleteMany({});
  await Category.deleteMany({});

  await Category.insertMany(importCategories);
  async
    .parallel({
      createdAccount2: (cb) => {
        const hashedPassword = bcrypt.hashSync("123456", 8);

        const phone = "0912345678";

        const number = phoneUtil.parse(phone, "VN");

        const phoneNumber = phoneUtil.format(number, PhoneNumberFormat.E164);

        Account.create(
          {
            profile: {
              fullName: "Jack Land",
              email: "jackland@gmail.com",
              avatar:
                "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg",
            },
            username: "member",
            phone: phoneNumber,
            password: hashedPassword,
            type: accountTypeEnum.MEMBER,
            authentication: {
              isCreatedPassword: true,
              isPhoneVerified: true,
            },
            status: accountStatusEnum.ACTIVE,
          },
          cb
        );
      },
      createdAdminAccount: (cb) => {
        const hashedPassword = bcrypt.hashSync("123456", 8);

        const phone = "0912345679";

        const number = phoneUtil.parse(phone, "VN");

        const phoneNumber = phoneUtil.format(number, PhoneNumberFormat.E164);

        Account.create(
          {
            profile: {
              fullName: "Admin",
              email: "admin@gmail.com",
              avatar:
                "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg",
            },
            username: "admin",
            phone: phoneNumber,
            password: hashedPassword,
            type: accountTypeEnum.ADMIN,
            authentication: {
              isCreatedPassword: true,
              isPhoneVerified: true,
            },
            status: accountStatusEnum.ACTIVE,
          },
          cb
        );
      },
    })
    .then(async (result) => {
      await createTaglines();
    });
};

const createTaglines = async (req, res, next) => {
  await Tag.deleteMany({});

  await Tag.insertMany(importTags);
  console.log(`✨ Inserted`);
  process.exit(0);
};

const createContact = async (req, res, next) => {
  await ContactMessage.create({
    name: "Tu",
    email: "tu@gmail.com",
    phone: "03939393",
    subject: "OK",
    message: "OK",
  });
  console.log("OKE");
  process.exit(0);
};

mongoose
  .connect(vars.mongo.uri, {
    keepAlive: true,
  })
  .then(() => {
    console.log("MongoDB connected...");

    console.log("[/] Waiting for migration begin...");
    setTimeout(() => {
      migrateData();
      // createContact()
    }, 3000);
  });
