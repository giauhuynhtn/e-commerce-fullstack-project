import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// import jwt from 'jsonwebtoken'
// import session from 'express-session'
// import cookieParser from 'cookie-parser'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import productRouter from './routers/product.router'
import userRouter from './routers/user.router'
import orderRouter from './routers/order.router'
import privateRouter from './routers/private.router'
import permissionRouter from './routers/permission.router'
import passport from 'passport'

import loginWithGoogle from '../src/passport/google'
// import { JWT_SECRET } from './util/secrets'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(
  cors({
    origin: '*',
  })
)
app.use(apiContentType)
app.use(express.json())
/** using passport also requires to ass session and cookieParser middlewares to express
 * To be activated later
app.use(cookieParser())
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60 * 60 * 24,
    },
    secret: 'secret',
  })
)
app.use(passport.initialize())
app.use(passport.session())
*/
app.use(passport.initialize())
passport.use(loginWithGoogle())

// Set up routers

app.use('/api/v1/login', privateRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/permissions', permissionRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
