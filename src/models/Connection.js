import mongoose from 'mongoose'

const connectionSchema = mongoose.Schema(
  {
    requester: {
      type: String,
    },
    requestee: {
      type: String,
    }
  }, 
  {
    timestamps: true,
  }
)

const Connection = mongoose.model('Connection', connectionSchema)

export default Connection