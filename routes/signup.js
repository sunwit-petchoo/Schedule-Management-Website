const express = require('express')
const router = express.Router()
const db = require('../database')
const bcrypt = require('bcrypt')
const saltRounds = 10;

router.get('/', (req, res) => {
    const msg = req.flash('message')
    const msgStatus =  req.flash('alert')
    console
    res.render('pages/signup', { 
        message: msg,
        msgStatus: msgStatus,
        layout:'./layouts/full-width',
        userId: "" 
    })
})

router.post('/', (req, res) =>{
    const fname = req.body.fname
    const sname = req.body.sname
    const email = req.body.email.toLowerCase()
    const password = req.body.password
    db.any("select count(*) as count from users where email = $1", email)
         .then((results) =>{
            
            if(results[0].count > 0){
                req.flash('message', 'email address already exists. Please try again ');
                req.flash('alert', 'alert-danger')
                return res.redirect('/signup')
            }else{
                bcrypt.hash(password, saltRounds, function(err, hash) {
                    db.none("INSERT INTO users (sur_name, first_name, email, password) VALUES ( $1, $2, $3, $4);", [sname,fname,email,hash])
                     .then(() =>{
                         req.flash('message', 'Congratulations !!! your account has been successfully created. Please login to continue.');
                         req.flash('alert', 'alert-success')
                         return res.redirect('/login')
                     })
                     .catch((err) => {
                        res.redirect('/error')
                    })
                });
            }
         })
         .catch((err) => {
            res.redirect('/error')
        })
})
module.exports = router