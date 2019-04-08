const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require("path")
require('dotenv').config()
/*
  Database
*/
const mongoose = require('./db/mongoose')
const User = require('./db/Models/User')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('MongoDB connected.')
});

/*
  Initial server
*/
const PORT = process.env.PORT || 5000;
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static(path.join(__dirname, "client", "build")))

const SECRET_KEY = process.env.SECRET_KEY || 'secret'

/*
  Routing
*/

// Register route
app.post('/register', (req, res) => {
  let userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }

  // Check if email exists
  User.findOne({
    email: req.body.email
  })
  .then((user) => {

    if (!user) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        userData.password = hash

        User.create(userData)
        .then((user) => {
          res.send({
            status: user.email + ' registered.'
          })
        })
        .catch((err) => {
          res.send(err)
        })

        if (err) {
          res.send(err)
        }
      })
    } else {
      res.send({
        status: 'Email already exists.'
      })
    }


  })
  .catch((err) => {
    res.send(err)
  })
})

// Login route
app.post('/login', (req, res) => {
  let userData = {
    email: req.body.email,
    password: req.body.password
  }

  User.findOne({
    email: req.body.email
  })
  .then((user) => {

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const payload = {
          _id: user._id,
          username: user.username,
          email: user.email,
          password: user.password,
          status: user.status
        }

        let token = jwt.sign(payload, SECRET_KEY, {
          expiresIn: '1h'
        })

        res.json({
          token: token
        })
      } else {
        res.json({
          error: "You have entered an invalid username or password"
        })
      }
    } else {
      res.json({
        error: "You have entered an invalid username or password"
      })
    }
  })
  .catch((err) => {
    res.send(err)
  })

})

app.get('/home', (req, res) => {
  let decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY)

  User.findOne({
    _id: decoded._id
  })
  .then((user) => {
    if (user) {
      res.json(user)
    } else {
      res.send("User does not exist")
    }
  })
})


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  })
}



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
})
