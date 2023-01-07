import express from 'express'

import {
  createOrder,
  deleteOrder,
  findAll,
  findById,
  updateOrder,
} from '../controllers/order.controller'

const router = express.Router()

router.get('/', findAll)
router.get('/:orderId', findById)
router.post('/', createOrder)
router.put('/:orderId', updateOrder)
router.delete('/:orderId', deleteOrder)

export default router
