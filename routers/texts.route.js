const router = require("express").Router()
const auth = require("../middleware/auth.middleware")
const Text = require("../models/Text")

router.post("/save-text", auth, async (req, res) => {
  try {
    const { userText, userStyles } = req.body
    const text = new Text({
      userText,
      userStyles
    })

    await text.save()
    res.json(text)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/", auth, async (req, res) => {
  try {
    const text = await Text.find({ user: req.userId })
    await text.save()
    res.status(201).json(text)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
router.post("/:id", auth, async (req, res) => {
  try {
    const text = await Text.findById(req.params.id)
    res.json(text)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
