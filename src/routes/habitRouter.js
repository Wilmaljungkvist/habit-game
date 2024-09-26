/**
 * Home routes.
 *
 * @author Wilma Ljungkvist
 */

import express from 'express'
import { HabitController } from '../controllers/habitController.js'

export const router = express.Router()

const controller = new HabitController()

const protectedRoute = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        req.session.flash = { type: 'danger', text: 'Logga in!' }
      res.redirect('/login')
    }
  }

router.get('/add-habit', protectedRoute, (req, res, next) => controller.index(req, res, next))
router.post('/add-habit', (req, res, next) => controller.addHabit(req, res, next))