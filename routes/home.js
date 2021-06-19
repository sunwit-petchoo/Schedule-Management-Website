const express = require('express')
const router = express.Router()
const { redirectToLogin } = require('../middlewares/auth')

router.get('/', redirectToLogin, (req, res) => {
 res.send("Hello")
})

module.exports = router