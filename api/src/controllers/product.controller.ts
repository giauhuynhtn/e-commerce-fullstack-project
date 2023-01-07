import { Request, Response, NextFunction } from 'express'

import Product from '../models/product'
import productService from '../services/product.service'
import { BadRequestError } from '../helpers/apiError'
import escapeRegExp from '../util/escapeRegExp'

// POST /products
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, category, description, price, quantity, img } = req.body
    const product = new Product({ name, category, description, price, quantity, img })

    await productService.create(product)
    res.json(product)
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /products
export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await productService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /products/sort/:sortType
// export const sortByName = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const type = req.params.sortType
//     if (type === 'asc' || type === 'desc') {
//       res.json(await productService.sortByName(type))
//     }
//   } catch (error) {
//     if (error instanceof Error && error.name === 'ValidationError') {
//       next(new BadRequestError('Invalid request', 400, error))
//     } else {
//       next(error)
//     }
//   }
// }

// GET /products/filterByName/:filterValue
export const filterByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const regexString = escapeRegExp(req.params.filterValue)
    const regex = new RegExp(req.params.filterValue, 'i')
    console.log('regex:', regex)

    res.json(await productService.filterByName(regex))
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /products/filterByCategory/:filterValue
export const filterByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryParam = req.params.filterValue

    res.json(await productService.filterByCategory(categoryParam))
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /products/:productId
export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await productService.findById(req.params.productId))
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /products/:productId
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const update = req.body
    const productId = req.params.productId
    const updatedProduct = await productService.update(productId, update)
    res.json(updatedProduct)
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /products/:productId
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productService.deleteProduct(req.params.productId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
