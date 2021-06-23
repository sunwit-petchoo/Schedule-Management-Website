const express = require('express')
const router = express.Router()
const db = require('../database')
const { redirectToLogin } = require('../middlewares/auth')

    router.get('/', redirectToLogin, (req, res) => {
        const query = "SELECT day, to_char(start_at,\'fmHH12:MI AM\') as start_at, to_char(end_at,\'fmHH12:MI AM\') as end_at "+ 
        "FROM schedules where user_id = $1;"
         db.any(query, req.session.userId)
         .then((schedules) =>{
            if(schedules.length > 0){
                res.render('pages/schedules',{
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
        router.post('/', redirectToLogin, (req, res) =>{
            const day = req.body.day
            const startAt = req.body.startTime
            const endAt = req.body.endTime
            db.none('insert into schedules(user_id, day, start_at, end_at)' +
    'values($1, $2, $3, $4)',[req.session.userId, day, startAt, endAt])
    .then((schedules) => {

        res.redirect('/schedules');
    })
    .catch((err) => {
        res.send(err)
    })
        })

module.exports = router