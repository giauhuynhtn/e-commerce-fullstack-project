import { Request, Response, NextFunction } from 'express'

import Order, { OrderDocument } from '../models/order'
import User from '../models/user'
import orderService from '../services/order.service'
import { BadRequestError } from '../helpers/apiError'
import userService from '../services/user.service'

// POST /orders
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderDate, deliveryDate, returnDate, products, userId } = req.body
    const order = new Order({ orderDate, deliveryDate, returnDate, products, userId })

    await userService.updateOne(userId, { orders: order._id })

    await orderService.create(order)

    res.json(order)
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}

//  GET /orders
export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await orderService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /orders/:orderId
export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await orderService.findById(req.params.orderId))
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}

//  PUT /orders/:orderId
export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const update = req.body
    const orderId = req.params.orderId
    const updatedOrder = await orderService.update(orderId, update)
    res.json(updatedOrder)
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /orders/:orderId
export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await orderService.deleteOrder(req.params.orderId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
