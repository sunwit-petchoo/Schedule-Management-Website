const express = require('express')
const router = express.Router()
const db = require('../database')
const { redirectToLogin } = require('../middlewares/auth')

router.get('/:id(\\d+)', redirectToLogin, (req, res) => {
    const query = "SELECT u.user_id as user_id, day, to_char(start_at,\'fmHH12:MI AM\') as start_at, to_char(end_at,\'fmHH12:MI AM\') as end_at," + 
    "sur_name, first_name, email FROM schedules s INNER JOIN users u ON s.user_id = u.user_id where u.user_id = $1;"
     db.any(query, req.params.id)
     .then((schedules) =>{
        if(schedules.length > 0){
            res.render('pages/user',{
                schedules: schedules,
                layout:'./layouts/full-width' 
                
            })
        }else{
            res.redirect('/404')
        }
       
     })
     .catch((err) => {
        res.send(err.message)
    })
    })

module.exports = router