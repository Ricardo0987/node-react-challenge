import { Schema, Document, model, Types } from 'mongoose';
import { User } from './user';

interface Product extends Document {
  name: string;
  image: string;
  price?: number;
  description?: string;
}

const schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, default: 0 },
  description: String,
});

const Products = model<Product>('product', schema);

export default Products;
