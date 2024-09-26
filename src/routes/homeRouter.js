/**
 * Home routes.
 *
 * @author Wilma Ljungkvist
 */

import express from 'express'
import { HomeController } from '../controllers/homeController.js'

export const router = express.Router()

const controller = new HomeController()

const protectedRoute = (req, res, next) => {
    if (req.session.user) {
      next()
    } else {
      req.session.flash = { type: 'danger', text: 'Inte inloggad!' }
      res.redirect('/login')
    }
  }

router.get('/', protectedRoute,  (req, res, next) => controller.index(req, res, next))