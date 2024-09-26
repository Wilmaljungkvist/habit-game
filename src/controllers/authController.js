import { AuthModel } from '../models/AuthModel.js'
import bcrypt from 'bcrypt'
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
              email: req.body.email
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
    
          const logo = '/img/BDTSMedia.png'
          const type = 'home'
          res.render('information/index', { logo, type })
        } catch (error) {
          next(error)
        }
      }

}