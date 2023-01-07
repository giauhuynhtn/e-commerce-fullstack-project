import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  category: string
  description: string
  price: number
  quantity: number
  img: string
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: true,
  },
  category: {
    type: String,
    index: true,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    index: true,
  },
  quantity: {
    type: Number,
  },
  img: String,
})

export default mongoose.model<ProductDocument>('Product', productSchema)
