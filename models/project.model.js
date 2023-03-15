import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import slugify from 'slugify';
import {projectStatusEnum} from '../enums/projectStatus.enum.js'

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: String,
    content: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    status: {
      type: Number,
      enum: Object.values(projectStatusEnum),
      default: projectStatusEnum.PUBLISHED
    },
    slug: {
      type: String,
      default() {
        if (this.title) {
          return `${slugify(this.title)}-${nanoid(6)}`;
        }
      },
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

const Project = mongoose.model('Project', projectSchema);
export { Project };
