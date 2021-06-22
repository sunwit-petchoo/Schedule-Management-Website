const express = require('express')
const router = express.Router()
const { redirectToLogin } = require('../middlewares/auth')
const db = require('../database')

router.get('/', (req, res) => {
    res.render('pages/404',{
        layout:'./layouts/err' 
    })
})

module.exports = router