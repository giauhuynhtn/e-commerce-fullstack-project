import express from 'express'

import {
  createPermission,
  deletePermission,
  findAll,
  findById,
  updatePermission,
} from '../controllers/permission.controller'

const router = express.Router()

router.get('/', findAll)
router.get('/:permissionId', findById)
router.post('/', createPermission)
router.put('/:permissionId', updatePermission)
router.delete('/:permissionId', deletePermission)

export default router
