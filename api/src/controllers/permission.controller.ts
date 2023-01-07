import { Request, Response, NextFunction } from 'express'

import Permission, { PermissionDocument } from '../models/permission'
import permissionService from '../services/permission.service'
import { BadRequestError } from '../helpers/apiError'

// POST /permissions
export const createPermission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role, description } = req.body
    const permission = new Permission({ role, description })

    await permissionService.create(permission)
    res.json(permission)
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}

//  GET /permissions
export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await permissionService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /permissions/:permissionId
export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await permissionService.findById(req.params.permissionId))
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /permissions/:permissionId
export const updatePermission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const update = req.body
    const permissionId = req.params.permissionId
    const updatedPermission = await permissionService.update(permissionId, update)
    res.json(updatedPermission)
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /permissions/:permissionId
export const deletePermission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await permissionService.deletePermission(req.params.permissionId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
