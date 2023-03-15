import mongoose from 'mongoose'
import {nanoid} from 'nanoid';
import slugify from 'slugify';
import mongoosePaginate from 'mongoose-paginate-v2';
const { Schema } = mongoose

const careerSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content:{
    type: String,
  },
  position: {
    type: String,
    required: true,
  },
  timeTable: {
    timeTitle: {
      type: String,
      default: "FULL TIME",
      required: true,
    },
    timeWork: {
      type: String,
      default: "100",
      required: true
    }
  },
  expirationWork: {
    type: String,
    required: true,
  },

  salary: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String,
    required: true,
    default: 'https://via.placeholder.com/300x300.jpg?text=tmptechnology.vn',
  },
  slug: {
    type: String,
    default() {
        if (this.title) {
            return `${slugify(this.title)}-${nanoid(6)}`;
        }
    },
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  status: {
    type: Number,
    required: true,
    default: 1,
  },
})

careerSchema.plugin(mongoosePaginate);

const Career = mongoose.model('careers', careerSchema)
export {Career}