import mongoose from 'mongoose';
import {mediaTypeEnum} from '../enums/mediaType.enum.js';
import {articleStatusEnum} from "../enums/articleStatus.enum.js";
import moment from "moment";

const { Schema } = mongoose;

const MediaSource=Object.freeze({
  Server:'server',
  Youtube:'youtube',
  Drive:'drive',
  S3:'s3'
})


const mediaSchema = new Schema({
  title: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  content: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  path: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(mediaTypeEnum),
    default: mediaTypeEnum.IMAGE,
  },
  status: {
    type: Number,
    enum: Object.values(articleStatusEnum),
    default: articleStatusEnum.PUBLISHED,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  source: {
    type: String,
    enum: Object.values(MediaSource),
    default: MediaSource.Server,
  },
  point: {
    type: Number,
    required: true,
    default:0
  },
  duration: {
    type: Number,
    required: true,
    default:0
  },
  views: {
    type: Number,
    required: true,
    default:0
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      delete ret.id;
    },
  },
});

mediaSchema.virtual('created').get(function (){
  return moment(this.createdAt).format('DD MMM YYYY');
});

const Media =  mongoose.model('Media', mediaSchema);

export {
  mediaSchema,
  Media
};