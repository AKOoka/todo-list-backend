const { model, Schema, Types } = require('mongoose')

const text = new Schema({
  userContent: {
    type: Array
  },
  userStyles: {
    type: String
  },
  user: {
    type: Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Text', text)
