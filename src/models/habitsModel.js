import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

const habitsSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true
  },
  creator: {
    type: String,
    required: [true, 'Creator is required.']
  },
  repeat: {
    type: Array,
    required: [true, 'Type is required.']
  },
  xp: {
    type: Number,
    required: [true, 'Type is required.']
  },
  streak: {
    type: Boolean,
    required: [true, 'Is it required for streak?']
  },
  doneToday: {
    type: Boolean, 
    required: [true]
}
})

habitsSchema.add(BASE_SCHEMA)

export const HabitsModel = mongoose.model('Habits', habitsSchema)
