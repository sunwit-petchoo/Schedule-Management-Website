const express = require('express')
const router = express.Router()
const { redirectToLogin } = require('../middlewares/auth')
const db = require('../database')

router.get('/', redirectToLogin, (req, res) => {
const query = "SELECT u.user_id as user_id, CONCAT(sur_name,' ', first_name) AS user_name, day, start_at, end_at " + 
"FROM schedules s INNER JOIN users u ON s.user_id = u.user_id;"
 db.any(query)
 .then((schedules) =>{
    res.render('pages/home',{
        schedules: schedules,
        layout:'./layouts/full-width' 
        
    })
 })
 .catch((err) => {
    res.send(err.message)
})
})

module.exports = router