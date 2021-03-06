const express = require('express')
const router = express.Router()
const { redirectToLogin } = require('../middlewares/auth')
const db = require('../database')

router.get('/', redirectToLogin, (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            res.redirect('/error')
        } else {
          res.clearCookie('mcoffee_sid')
          res.redirect('/login')
        }
      })
})

module.exports = router