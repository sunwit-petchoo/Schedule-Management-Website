const express = require('express')
const router = express.Router()
const db = require('../database')
const { redirectToLogin } = require('../middlewares/auth')

    router.get('/', redirectToLogin, (req, res) => {
        const query = "SELECT schedule_id, day, to_char(start_at,\'fmHH12:MI AM\') as start_at, to_char(end_at,\'fmHH12:MI AM\') as end_at "+ 
        "FROM schedules where user_id = $1;"
         db.any(query, req.session.userId)
         .then((schedules) =>{
            if(schedules.length >= 0){
                const msg = req.flash('message')
                const msgStatus =  req.flash('alert')
                res.render('pages/schedules',{
                    message: msg,
                    msgStatus: msgStatus,
                    schedules: schedules,
                    userId: req.session.userId,
                    layout:'./layouts/full-width' 
                })
            }else{
                res.redirect('/error')
            }
         })
         .catch((err) => {
            res.redirect('/error')
        })
        })
        router.post('/', redirectToLogin, (req, res) =>{
            const day = req.body.day
            const startAt = req.body.startTime
            const endAt = req.body.endTime
            db.none('insert into schedules(user_id, day, start_at, end_at)' +
    'values($1, $2, $3, $4)',[req.session.userId, day, startAt, endAt])
    .then((schedules) => {
        req.flash('message', 'new schedule has been successfully created.');
        req.flash('alert', 'alert-success')
        res.redirect('/schedules');
    })
    .catch((err) => {
        res.redirect('/error')
    })
        })
        router.post('/:id', redirectToLogin, (req, res) =>{
            const scheduleId = req.params.id
           
            db.none('delete from schedules where schedule_id = $1' , scheduleId)
    .then(() => {
        req.flash('message', 'Delete successfully.');
        req.flash('alert', 'alert-success')
        res.redirect('/schedules');
    })
    .catch((err) => {
        res.redirect('/error')
    })
        })

module.exports = router