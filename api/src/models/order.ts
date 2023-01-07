import mongoose, { Document } from 'mongoose'

interface ProductObj {
  productId: mongoose.Schema.Types.ObjectId
  productQnt: number
}

export type OrderDocument = Document & {
  orderDate: Date
  deliveryDate: Date
  returnDate: Date
  products: ProductObj[]
  userId: mongoose.Schema.Types.ObjectId
  status: 'pending' | 'delivered' | 'returned' | 'cancelled'
}

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    index: true,
    default: new Date(),
  },
  deliveryDate: {
    type: Date,
  },
  returnDate: {
    type: String,
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      productQnt: { type: Number },
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['pending', 'delivered', 'returned', 'cancelled'],
    default: 'pending',
  },
})

export default mongoose.model<OrderDocument>('Order', orderSchema)
