const express = require('express')
const router = express.Router()
const { redirectToLogin } = require('../middlewares/auth')
const db = require('../database')

router.get('/', redirectToLogin, (req, res) => {
    res.render('pages/error',{
        userId: req.session.userId,
        layout:'./layouts/full-width' 
    })
})

module.exports = router