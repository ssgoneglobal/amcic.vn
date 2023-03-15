import mongoose from "mongoose";
import { nanoid } from "nanoid";
import slugify from "slugify";
import mongoosePaginate from "mongoose-paginate-v2";
import { articleStatusEnum } from "../enums/articleStatus.enum.js";
import moment from "moment";
import {LanguageList} from "./enums.model.js";

const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
      point: {
          type: Number,
          required: true,
          default:0
      },
    thumbnail: {
      type: String,
      required: true,
      default: "https://via.placeholder.com/300x300.jpg?text=BRANDHERE",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    content: {
      type: String,
    },
    source: {
      type: String,
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    slug: {
      type: String,
      default() {
        if (this.title) {
          return `${slugify(this.title)}-${nanoid(12)}`;
        }
      },
    },
    status: {
      type: Number,
      enum: Object.values(articleStatusEnum),
      default: articleStatusEnum.PUBLISHED,
    },
      lan: {
          type: String,
          enum: Object.values(LanguageList),
          default: LanguageList.ENGLISH,
          required:true,
      },
    isFeatured: {
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

articleSchema.virtual('created').get(function (){
   return moment(this.createdAt).format('DD MMM YYYY');
});

articleSchema.plugin(mongoosePaginate);

const Article = mongoose.model("article", articleSchema);
export { Article };
