import mongoose from 'mongoose';
import {nanoid} from 'nanoid';
import slugify from 'slugify';
import mongoosePaginate from 'mongoose-paginate-v2';


const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    featuredImage: {
        type: String,
        required: true,
        default: 'https://via.placeholder.com/300x300.jpg?text=BRANDHERE',
    },
    content: {
        type: String,
    },
    slug: {
        type: String,
        default() {
            if (this.name) {
                return `${slugify(this.name)}-${nanoid(6)}`;
            }
        },
    },
    status: {type: Boolean, required: true, default: true}

}, {timestamp: true});

newsSchema.plugin(mongoosePaginate);

export default mongoose.model('news', newsSchema)