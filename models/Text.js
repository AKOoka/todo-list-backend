const { model, Schema, Types } = require('mongoose')

const text = new Schema({
  userText: {
    type: String,
    required: true
  },
  userStyles: {
    type: String,
    required: true
  },
  user: {
    type: Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Text', text)
