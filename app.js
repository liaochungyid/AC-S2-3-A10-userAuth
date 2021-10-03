const { urlencoded } = require('express')
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

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

app.get('/', (req, res) => {
  res.render('login')
})

app.post('/', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const loginUser = users.find((user => {
    return user.email === email && user.password === password
  }))

  if (loginUser) {
    res.status(200).send(`Welcome back, ${loginUser.firstName}!`)
  } else {
    res.render('login', { 'warning': 'eamil or password incorrect!' })
  }

})

app.listen(3000, () => {
  console.log('server is listening on http://localhost:300')
})