const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')

router.post('/register', [
  check('login').isLength({ min: 2 }),
  check('email').isEmail(),
  check('password').isLength({ min: 5 })
], async (req, res) => {
  try {
    const validation = validationResult(req)

    if (!validation.isEmpty()) {
      return res.status(400).json({ message: validation.array() })
    }

    const { login, email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: 'invalid email' })
    }

    const cryptedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ login, password: cryptedPassword, email })

    await newUser.save()

    res.status(200).json({ message: 'User is created' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/login', [
  check('email').isEmail(),
  check('password').exists()
], async (req, res) => {
  try {
    const validation = validationResult(req)

    if (!validation.isEmpty()) {
      return res.status(400).json({ message: validation.array() })
    }

    const { email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (!existingUser) {
      return res.status(400).json({ message: 'invalide values' })
    }

    const existingPassword = await bcrypt.compare(password, existingUser.password)

    if (!existingPassword) {
      return res.status(400).json({ message: 'invalide values' })
    }

    const token = jwt.sign({ id: existingUser.id }, 'very special secret')

    res.json({ token, user: { userId: existingUser.id, userLogin: existingUser.login } })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
