import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import validator from 'validator'
import { BASE_SCHEMA } from './baseSchema.js'

const { isEmail } = validator

// TODO: bör finnas för lvl. streak, level xp, längsta streak osv. 
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email address is required.'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Please provide a valid email address.']
  },
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    match: [/^[A-Za-z][A-Za-z0-9_-]{1,255}$/, 'Please provide a valid username.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minLength: [8, 'The password must be of minimum length 8 characters.'],
    maxLength: [256, 'The password must be of maximum length 256 characters.']
  },
  xp: {
      type: Number,
      required: [false],
  },
  rewards: {
    type: Array, 
    required: [false],
  }, 
  goals: {
    type: Array, 
    required: [false],
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
})

schema.add(BASE_SCHEMA)

schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10)
})

export const AuthModel = mongoose.model('Auth', schema)
