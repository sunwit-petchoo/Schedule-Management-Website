const express = require('express')
const router = express.Router()
const db = require('../database')
const bcrypt = require('bcrypt')
const { redirectToHome } = require('../middlewares/auth')

router.get('/', redirectToHome, (req, res) => {
    res.render('pages/login', { layout:'./layouts/full-width' })
})

router.post('/', redirectToHome, (req, res) =>{
    db.oneOrNone('SELECT * FROM users WHERE email = $1', [req.body.email.toLowerCase()])
    .then((existingUser) => {
      // if not, return error
      
      if (!existingUser) {
        return res.redirect('/login?message=Incorrect%20login%20details.')
      }
  
      // if so, does password match user password?
        const email = existingUser.email
        const userId = existingUser.id
        const password = existingUser.password
        
        if(req.body.password === password){
            req.session.userId = existingUser.user_id
            console.log(req.session)
            console.log(password)
            res.redirect('/')
        }else{
            res.redirect('/login?message=Incorrect%20login%20details.')
        }
    })
    .catch((err) => {
      // couldn't query the database properly
      res.send(err.message)
    })
})
module.exports = router