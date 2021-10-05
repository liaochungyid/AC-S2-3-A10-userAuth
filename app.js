const { urlencoded } = require('express')
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser')

const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]


app.set('view engine', 'hbs')
app.engine('hbs', exphbs({ defaultLayout: "main", extname: '.hbs' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('000000'))

app.get('/index', (req, res) => {
  if (req.cookies.uuname) {
    res.render('index', {
      name: req.cookies.uuname,
      message: `
      <p>Your email: ${req.cookies.uuemail}</p><p>Your password(signed): ${req.signedCookies.uupass}</p><p>Cookies will expire within 20 seconds.</p>`
    })
  } else {
    res.redirect('/')
  }

})

app.post('/logout', (req, res) => {
  res.clearCookie('uuname', { path: '/' })
  res.clearCookie('uuemail', { path: '/' })
  res.clearCookie('uupass', { path: '/' })
  res.redirect('/')
})

app.get('/', (req, res) => {
  if (req.cookies.uuname) {
    res.render('index', {
      name: req.cookies.uuname,
      message: `
      <p>Your email: ${req.cookies.uuemail}</p><p>Your password(signed): ${req.signedCookies.uupass}</p><p>Cookies will expire within 20 seconds.</p>`
    })
  } else {
    res.render('login')
  }
})

app.post('/', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const loginUser = users.find((user => {
    return user.email === email && user.password === password
  }))

  if (loginUser) {
    res.cookie('uuname', loginUser.firstName, { path: '/', signed: false, maxAge: 20000 })
    res.cookie('uuemail', email, { path: '/', signed: false, maxAge: 20000 })
    res.cookie('uupass', password, { path: '/', signed: true, maxAge: 20000 })
    res.redirect('/index')
  } else {
    res.render('login', { 'warning': 'eamil or password incorrect!' })
  }

})

app.listen(3000, () => {
  console.log('server is listening on http://localhost:3000')
})