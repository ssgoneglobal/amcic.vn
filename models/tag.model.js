import mongoose from 'mongoose';
import {tagTypeEnum} from '../enums/tagType.enum.js';
const { Schema } = mongoose;

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    enum: Object.values(tagTypeEnum),
    default: tagTypeEnum.ARTICLE,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  useTotal: {
    type: Number,
    required: true,
    default: 0
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
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      delete ret.id;
    },
  },
})

const Tag = mongoose.model('Tag', TagSchema);
export {Tag}
