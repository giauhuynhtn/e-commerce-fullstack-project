import { NotFoundError } from '../helpers/apiError'
import Permission, { PermissionDocument } from '../models/permission'

const create = async (permission: PermissionDocument): Promise<PermissionDocument> => {
  return permission.save()
}

const findAll = async (): Promise<PermissionDocument[]> => {
  return Permission.find()
}

const findById = async (permissionId: string): Promise<PermissionDocument> => {
  const foundPermission = await Permission.findById(permissionId)

  if (!foundPermission) {
    throw new NotFoundError(`Permission ${permissionId} does not exist`)
  }

  return foundPermission
}

const update = async (
  permissionId: string,
  update: Partial<PermissionDocument>
): Promise<PermissionDocument | null> => {
  const foundPermission = await Permission.findByIdAndUpdate(permissionId, update, {
    new: true,
  })

  if (!foundPermission) {
    throw new NotFoundError(`Permission ${permissionId} does not exist`)
  }
  return foundPermission
}

const deletePermission = async (permissionId: string): Promise<PermissionDocument | null> => {
  const foundPermission = await Permission.findByIdAndDelete(permissionId)

  if (!foundPermission) {
    throw new NotFoundError(`Permission ${permissionId} does not exist`)
  }

  return foundPermission
}

export default { create, findAll, findById, update, deletePermission }
