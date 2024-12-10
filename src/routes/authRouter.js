/**
 * Home routes.
 *
 * @author Wilma Ljungkvist
 */

import express from 'express'
import { AuthController } from '../controllers/authController.js'

export const router = express.Router()

const controller = new AuthController()

const protectedRoute = (req, res, next) => {
    if (req.session.user) {
        req.session.flash = { type: 'danger', text: 'Du har redan loggat in!' }
      res.redirect('/')
    } else {
        next()
    }
  }

router.get('/login', protectedRoute, (req, res, next) => controller.index(req, res, next))
router.get('/register', protectedRoute, (req, res, next) => controller.registerPage(req, res, next))
router.post('/register', (req, res, next) => controller.registerUser(req, res, next))
router.post('/login', (req, res, next) => controller.loginUser(req, res, next))
router.post('/login/forgot-password', (req, res, next) => controller.forgotPassword(req, res, next))
router.get('/login/forgot-password', (req, res, next) => controller.getForgotPassword(req, res, next))
router.post('/login/reset-password/:token', (req, res, next) => controller.resetPassword(req, res, next))
router.get('/login/reset-password/:token', (req, res, next) => controller.getResetPassword(req, res, next))