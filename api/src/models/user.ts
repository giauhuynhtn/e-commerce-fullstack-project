import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  firstname: string
  lastname: string
  email: string
  username?: string
  password?: string
  orders: mongoose.Schema.Types.ObjectId[]
  isAdmin: boolean
  permission: mongoose.Schema.Types.ObjectId
  isBanned: boolean
}

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
      },
      message: 'Please enter a valid email',
    },
    required: [true, 'Email required'],
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  orders: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Order',
  },
  permission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission',
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
