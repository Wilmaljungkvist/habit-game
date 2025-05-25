import express from 'express'
import { router as homeRouter } from './homeRouter.js'
import { router as authRouter } from './authRouter.js'
import { router as habitRouter } from './habitRouter.js'
import { router as levelRouter } from './levelRouter.js'
import { router as accountRouter } from './accountRouter.js'


export const router = express.Router()

router.use('/', homeRouter)
router.use('/', authRouter)
router.use('/',  habitRouter)
router.use('/', levelRouter)
router.use('/', accountRouter)

router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
