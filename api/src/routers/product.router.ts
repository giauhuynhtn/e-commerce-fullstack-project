import express from 'express'

import {
  createProduct,
  findAll,
  findById,
  updateProduct,
  deleteProduct,
  filterByName,
  filterByCategory,
} from '../controllers/product.controller'

import checkAuth from '../middlewares/checkAuth'

const router = express.Router()

router.get('/', checkAuth, findAll)
// router.get('/', findAll)
router.get('/:productId', findById)
router.get('/filterByName/:filterValue', filterByName)
router.get('/filterByCategory/:filterValue', filterByCategory)
router.post('/', createProduct)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

export default router
