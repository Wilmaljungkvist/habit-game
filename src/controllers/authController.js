import { AuthModel } from '../models/AuthModel.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

export class AuthController {

    async index (req, res, next) {
        try {
            if (req.session.user) {
                return res.redirect('/')
            }
            const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]
      const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      const currentDate = new Date()
      const day = currentDate.getDate()
      const weekDay = currentDate.getDay()
      const month = currentDate.getMonth()
      const monthString = monthNames[month]
      const date = `${day} ${monthString} ${weekDays[weekDay]}`
      const contentType = 'home'

            res.render('auth/login', { date, type: contentType})
        } catch (err) {
           console.log(err)
        }
    }


    async registerPage (req, res, next) {
        try {
          const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]
          const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          const currentDate = new Date()
          const day = currentDate.getDate()
          const weekDay = currentDate.getDay()
          const month = currentDate.getMonth()
          const monthString = monthNames[month]
          const date = `${day} ${monthString} ${weekDays[weekDay]}`
          const contentType = 'home'

          res.render('auth/register', { date, type: contentType })
        } catch (error) {
          next(error)
        }
      }



      async registerUser (req, res, next) {
        try {
          const existingUser = await AuthModel.findOne({ username: req.body.username })
    
          if (existingUser) {
            req.session.flash = { type: 'danger', text: 'Användarnamnet används redan' }
            res.redirect('/login')
          } else {
            const user = new AuthModel({
              username: req.body.username,
              password: req.body.password,
              name: req.body.name,
              email: req.body.email,
              xp: 0
            })
    
            await user.save()
    
            req.session.flash = { type: 'success', text: 'The User was created successfully' }
            res.redirect('/')
          }
        } catch (error) {
          req.session.flash = { type: 'danger', text: error }
          console.error('Error adding user:', error)
        }
      }

      async loginUser (req, res, next) {
        try {
          const existingUser = await AuthModel.findOne({ username: req.body.username })
    
          if (!existingUser) {
            req.session.flash = { type: 'danger', text: 'Fel användarnamn eller lösenord!' }
            res.redirect('/login')
          }
    
          if (existingUser) {
            const userPass = await AuthModel.findOne({ username: req.body.username }, { password: 1 })
            const hashedPass = await bcrypt.compare(req.body.password, userPass.password)
    
            if (hashedPass) {
              this.session = req.session
              this.session.userid = req.body.username
              req.session.user = existingUser
              res.redirect('/')
            } else {
              req.session.flash = { type: 'danger', text: 'Fel användarnamn eller lösenord!' }
              res.redirect('/login')
            }
          }

          const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]
            const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            const currentDate = new Date()
            const day = currentDate.getDate()
            const weekDay = currentDate.getDay()
            const month = currentDate.getMonth()
            const monthString = monthNames[month]
            const date = `${day} ${monthString} ${weekDays[weekDay]}`
            const contentType = 'home'
    
          res.render('home/index', { type: contentType, date })
        } catch (error) {
          next(error)
        }
      }

      async forgotPassword (req, res, next) {
        try {
          const { email } = req.body
          const user = await AuthModel.findOne({ email })
    
          if (user !== null) {
            const token = crypto.randomBytes(20).toString('hex')
            user.resetPasswordToken = token
            user.resetPasswordExpires = Date.now() + 3600000
            await user.save()
            const transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 587,
              secure: false,
              auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
              }
            })
    
            const mailOptions = {
              from: process.env.EMAIL,
              to: email,
              subject: 'Reset your password',
              text: 'You are receiving this because you (or someone else) have requested to reset the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            `http://${req.headers.host}/login/reset-password/${token}\n\n` +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            }
    
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Error:', error)
                req.session.flash = { type: 'danger', text: 'Failed to send password reset email' }
                res.redirect('/')
              } else {
                console.log('Email sent:', info.response)
                req.session.flash = { type: 'success', text: 'Password reset email sent successfully!' }
                res.redirect('/')
              }
            })
          }

          const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]
          const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          const currentDate = new Date()
          const day = currentDate.getDate()
          const weekDay = currentDate.getDay()
          const month = currentDate.getMonth()
          const monthString = monthNames[month]
          const date = `${day} ${monthString} ${weekDays[weekDay]}`
          const contentType = 'home'
  
        res.render('auth/forgotPasswordText', { type: contentType, date, email })
        } catch (error) {
          next(error)
        }
      }


      async getForgotPassword (req, res, next) {
        try {

          const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]
          const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          const currentDate = new Date()
          const day = currentDate.getDate()
          const weekDay = currentDate.getDay()
          const month = currentDate.getMonth()
          const monthString = monthNames[month]
          const date = `${day} ${monthString} ${weekDays[weekDay]}`
          const contentType = 'home'
    
          res.render('auth/forgotPassword', { date, type: contentType})
        } catch (error) {
          next(error)
        }
      }


      async resetPassword (req, res, next) {
        try {
          const { token } = req.params
          const { password } = req.body
    
          const user = await AuthModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
          })
    
          if (!user) {
            req.session.flash = { type: 'danger', text: 'Password reset token is invalid or has expired' }
            return res.redirect('/')
          }
    
          user.password = password
          user.resetPasswordToken = undefined
          user.resetPasswordExpires = undefined
          await user.save()
    
          req.session.flash = { type: 'success', text: 'Password reset successful!' }
          res.redirect('/login')
        } catch (error) {
          next(error)
        }
      }


      async getResetPassword (req, res, next) {
        try {
          const token = req.params.token
          const user = await AuthModel.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
          })
          if (!user) {
            req.session.flash = { type: 'danger', text: 'Password reset token is invalid or has expired' }
            return res.redirect('/')
          }
          const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]
          const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          const currentDate = new Date()
          const day = currentDate.getDate()
          const weekDay = currentDate.getDay()
          const month = currentDate.getMonth()
          const monthString = monthNames[month]
          const date = `${day} ${monthString} ${weekDays[weekDay]}`
          const contentType = 'home'
    
          res.render('auth/newPassword', { date, type: contentType, token})
        } catch (error) {
          next(error)
        }
      }

      async logoutUser (req, res, next) {
        const loggedIn = await req.session.user
        if (loggedIn) {
          delete req.session.user
          req.session.flash = { type: 'success', text: 'Lyckad utloggning!' }
          res.redirect('/login')
        } else {
          res.status(404).send('Not found')
        }
      }
}