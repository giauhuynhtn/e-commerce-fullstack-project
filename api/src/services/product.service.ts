import { NotFoundError } from '../helpers/apiError'
import Product, { ProductDocument } from '../models/product'

const create = async (product: ProductDocument): Promise<ProductDocument> => {
  return product.save()
}

const findAll = async (): Promise<ProductDocument[]> => {
  return Product.find()
}

const findById = async (productId: string): Promise<ProductDocument> => {
  const foundProduct = await Product.findById(productId)

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }

  return foundProduct
}

const update = async (
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
  const foundProduct = await Product.findByIdAndUpdate(productId, update, {
    new: true,
  })

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }

  return foundProduct
}

const deleteProduct = async (productId: string): Promise<ProductDocument | null> => {
  const foundProduct = await Product.findByIdAndDelete(productId)

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }

  return foundProduct
}

const sortByName = async (sortType: 'asc' | 'desc'): Promise<ProductDocument[]> => {
  return Product.find().sort({ name: sortType })
}

const filterByName = async (filterValue: RegExp): Promise<ProductDocument[]> => {
  return Product.find({ name: { $regex: filterValue } })
}

const filterByCategory = async (filterValue: string): Promise<ProductDocument[]> => {
  return Product.find({ category: filterValue })
}

export default {
  create,
  findAll,
  findById,
  update,
  deleteProduct,
  sortByName,
  filterByName,
  filterByCategory,
}
