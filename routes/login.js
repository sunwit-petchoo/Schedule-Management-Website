const express = require('express')
const router = express.Router()
const db = require('../database')
const bcrypt = require('bcrypt')
const { redirectToHome } = require('../middlewares/auth')

router.get('/', redirectToHome, (req, res) => {
    const msg = req.flash('message')
    const msgStatus =  req.flash('alert')
    res.render('pages/login',  {
      message: msg,
      msgStatus: msgStatus,
      userId: "",
      layout:'./layouts/full-width' 
    })
})

router.post('/', redirectToHome, (req, res) =>{
    
    if(req.body.email === "" || req.body.password === "")
    {
        req.flash('message', 'Your authentication information is incorrect. Please try again.');
        req.flash('alert', 'alert-danger')
        return res.redirect('/login') 
    }
    db.oneOrNone('SELECT * FROM users WHERE email = $1', [req.body.email.toLowerCase()])
    .then((existingUser) => {
      // if not, return error
      if (!existingUser) {
        req.flash('message', 'Your authentication information is incorrect. Please try again.');
        req.flash('alert', 'alert-danger')
        return res.redirect('/login')
      }
  
      // if so, does password match user password?
        const email = existingUser.email
        const userId = existingUser.id
        const hash = existingUser.password
        
        bcrypt.compare(req.body.password, hash, function(err, result) {
          if (result) {
            // if successful, create session and redirect
            req.session.userId = existingUser.user_id
            res.redirect('/')
    
          } else {
            req.flash('message', 'Your authentication information is incorrect. Please try again.');
            req.flash('alert', 'alert-danger')
            return res.redirect('/login')
          }
        })
    })
    .catch((err) => {
      // couldn't query the database properly
      res.redirect('/error')
    })
})
module.exports = router