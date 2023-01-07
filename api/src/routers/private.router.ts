import express from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'
import passport from 'passport'

const router = express.Router()

router.post(
  '/',
  (req, res, next) => {
    next()
  },
  passport.authenticate('google-id-token', { session: false }),
  (req, res) => {
    const user: any = req.user

    const token = jwt.sign(
      {
        userId: user._id,
        firstname: user.firstname,
        permission: user.permission,
        banStatus: user.isBanned,
        isAdmin: user.isAdmin,
        orders: user.orders,
      },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    )
    res.json({ msg: 'done', user: req.user, token })
  }
)

export default router
