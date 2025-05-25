/**
 * Home routes.
 *
 * @author Wilma Ljungkvist
 */

import express from 'express'
import { AccountController } from '../controllers/accountController.js'

export const router = express.Router()

const controller = new AccountController()

const protectedRoute = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        req.session.flash = { type: 'danger', text: 'Logga in!' }
      res.redirect('/login')
    }
  }

router.get('/account', protectedRoute, (req, res, next) => controller.index(req, res, next))
router.post('/add-goals', protectedRoute, (req, res, next) => controller.addGoals(req, res, next))
router.post('/add-rewards', protectedRoute, (req, res, next) => controller.addRewards(req, res, next))