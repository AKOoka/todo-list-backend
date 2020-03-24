const { model, Schema, Types } = require('mongoose')

const user = new Schema({
  login: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  text: {
    type: Types.ObjectId,
    ref: 'Text'
  }
})

module.exports = model('User', user)
