import mongoose from 'mongoose'

const suggestionSchema = mongoose.Schema(
  {
    suggestionInitiator: {
      type: String,
    },
    suggestedOne: {
      id:{
        type: String
      },
      status: {
        type: String
      }
    },
    suggestedTwo: {
      id:{
        type: String
      },
      status: {
        type: String
      }
    },
    reason: {
      type: String,
    },
  }, 
  {
    timestamps: true,
  }
)

const Suggestion = mongoose.model('Suggestion', suggestionSchema)

export default Suggestion