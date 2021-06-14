
const express = require('express')
const morgan = require('morgan')
const db = require('./database')
const expressLayouts = require('express-ejs-layouts')
require('dotenv').config()
// ROUTES
const homeRouter = require('./routes/home')

//uncomment to start working on each route
//const loginRouter = require('./routes/login')             
//const logoutRouter = require('./routes/logout')
//const signupRouter = require('./routes/signup')
//const errRouter = require('./routes/404')

const app = express()

// body parser - parsing post requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// view engine
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(expressLayouts)

// morgan setup
app.use(morgan('dev'))

// port
const PORT = process.env.PORT || 3000

app.use('/', homeRouter)
//app.use('/login', loginRouter)
//app.use('/logout', logoutRouter)
//app.use('/signup', signupRouter)
//app.use('*', errRouter)



app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`)
})