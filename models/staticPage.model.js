import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import slugify from 'slugify';
import mongoosePaginate from 'mongoose-paginate-v2';
import { staticPageStatusEnum } from '../enums/staticPageStatus.enum.js';

const { Schema } = mongoose;

const staticPageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      default() {
        if (this.name) {
          return `${slugify(this.name)}-${nanoid(6)}`;
        }
      },
    },
    link: {
      type: String,
      default() {
        if (this.slug) {
          return `/${this.slug}`;
        }
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: Object.values(staticPageStatusEnum),
      default: staticPageStatusEnum.PUBLISHED,
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

staticPageSchema.plugin(mongoosePaginate);

const StaticPage = mongoose.model('StaticPage', staticPageSchema);
export { StaticPage };
