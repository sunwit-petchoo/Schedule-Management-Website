const express = require('express')
const router = express.Router()
const { redirectToLogin } = require('../middlewares/auth')
const db = require('../database')

router.get('/', (req, res) => {
    res.clearCookie('mcoffee_sid')
    res.redirect('/login')
})

module.exports = router