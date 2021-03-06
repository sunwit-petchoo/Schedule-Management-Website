
const express = require('express')
const morgan = require('morgan')
const db = require('./database')
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const path = require('path')
// ROUTES
const homeRouter = require('./routes/home')

//uncomment to start working on each route
const loginRouter = require('./routes/login')             
const logoutRouter = require('./routes/logout')
const signupRouter = require('./routes/signup')
const userRouter = require('./routes/user')
const schedulesRouter = require('./routes/schedules')
const errRouter = require('./routes/404')
const sysErrRouter = require('./routes/error')



const app = express()

// body parser - parsing post requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('', express.static(path.join(__dirname, 'public')))
// view engine
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(flash())

// morgan setup
app.use(morgan('dev'))

// port
const PORT = process.env.PORT || 3000

// session setup
app.use(session({
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
  },
  name: 'mcoffee_sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))


app.use('/', homeRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/signup', signupRouter)
app.use('/user', userRouter)
app.use('/schedules', schedulesRouter)
app.use('/error', sysErrRouter)
app.use('*', errRouter)



app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`)
})