import { NotFoundError } from '../helpers/apiError'
import Order, { OrderDocument } from '../models/order'

const create = async (order: OrderDocument): Promise<OrderDocument> => {
  return order.save()
}

const findAll = async (): Promise<OrderDocument[]> => {
  return Order.find().populate('userId')
}

const findById = async (orderId: string): Promise<OrderDocument> => {
  const foundOrder = await Order.findById(orderId).populate('products')

  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} does not exist`)
  }

  return foundOrder
}

const update = async (
  orderId: string,
  update: Partial<OrderDocument>
): Promise<OrderDocument | null> => {
  const foundOrder = await Order.findByIdAndUpdate(orderId)

  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} does not exist`)
  }

  return foundOrder
}

const deleteOrder = async (orderId: string): Promise<OrderDocument | null> => {
  const foundOrder = await Order.findByIdAndDelete(orderId)

  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} does not exist`)
  }

  return foundOrder
}

export default { create, findAll, findById, update, deleteOrder }
