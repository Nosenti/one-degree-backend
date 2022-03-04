import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
import crypto from 'crypto'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true,'Please tell us your name'],
    },
    email: {
      type: String,
      required: [true,'Please provide your email'],
      unique: true,
    },
    avatar: {
      type: String
    },
    password: {
      type: String,
      required: [true,'Please provide your password'],
      minLength: 8
    }
  }, 
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User