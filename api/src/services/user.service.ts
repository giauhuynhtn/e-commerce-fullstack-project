import { NotFoundError } from '../helpers/apiError'
import User, { UserDocument } from '../models/user'

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find().populate('permission')
}

const findById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId).populate('permission')

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} does not exist`)
  }

  return foundUser
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} does not exist`)
  }
  return foundUser
}

const updateOne = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} does not exist`)
  }

  await User.updateOne({ _id: userId }, { $push: update })

  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} does not exist`)
  }

  return foundUser
}

export default { create, findAll, findById, update, deleteUser, updateOne }
