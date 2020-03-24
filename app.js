const express = require('express')
const config = require('config')
const cors = require('cors')
const mongoose = require('mongoose')
const auth = require('./routers/auth.route.js')

const app = express()

app.use(cors())

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: false })) // for postman use
app.use('/api/auth', auth)

async function start () {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    app.listen(config.get('port'), () => { console.log('Server start') })
  } catch (error) {
    console.info(error.message)

    process.exit(1)
  }
}

start()
