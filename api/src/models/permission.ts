import mongoose, { Document } from 'mongoose'

export type PermissionDocument = Document & {
  role: string
  description: string
}

const permissionSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
})

export default mongoose.model<PermissionDocument>('Permission', permissionSchema)
