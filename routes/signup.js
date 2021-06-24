const express = require('express')
const router = express.Router()
const db = require('../database')
const bcrypt = require('bcrypt')
const saltRounds = 10;

router.get('/', (req, res) => {
    res.render('pages/signup', { layout:'./layouts/full-width' })
})

router.post('/', (req, res) =>{
    const fname = req.body.fname
    const sname = req.body.sname
    const email = req.body.email.toLowerCase()
    const password = req.body.password
    db.any("select count(*) as count from users where email = $1", email)
         .then((results) =>{
            
            if(results[0].count > 0){
               // handle error user email exist
               console.log("sssssss") 
            }else{
                bcrypt.hash(password, saltRounds, function(err, hash) {
                    db.none("INSERT INTO users (sur_name, first_name, email, password) VALUES ( $1, $2, $3, $4);", [sname,fname,email,hash])
                     .then(() =>{
                      res.redirect('/login')
                     })
                     .catch((err) => {
                        res.send(err.message)
                    })
                });
            }
         })
         .catch((err) => {
            res.send(err.message)
        })
})
module.exports = router