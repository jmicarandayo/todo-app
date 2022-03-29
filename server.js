const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User')
require('dotenv/config')


mongoose.connect(process.env.DB_CONNECTION)
    .then(res => app.listen(port, (err) => {
        if (err) return console.log(err);
        console.log('server running on port ' + port);
      }))
    .catch(err => console.log(err))

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));



// routes
app.get('/', (req,res) => {
    res.send('This is now working!')
})

// signup
app.post('/signup', (req, res) => {
    console.log(req.body)
    const newUser = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    newUser.save(err => {
        if(err){
            return res.status(400).json({
                title: 'error',
                error: 'Email is already in use.'
            })
        }
        return res.status(200).json({
            title: 'success',
            message: 'Sign-up successfull'
        })
    })   
})

//login
app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if(err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            })
        }
        //email add not yet registered
        if(!user) {
            return res.status(401).json({
                title: 'user not found',
                error: 'Invalid credentials'
            })
        }
        // incorrect password
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'login failed',
                error: 'Invalid credentials'
            })
        }
        //If all good
        let token = jwt.sign({userId: user._id}, 'demoproject')
        return res.status(200).json({
            title: 'login sucsess',
            token: token
        })
    })
})

app.get('/user', (req, res) => {
    let token = req.headers.token
    jwt.verify(token, 'demoproject', (err, decoded) => {
        if(err) return res.status(401).json({
            title: 'Unauthorized'
        })
        // token is valid
        User.findOne({ _id: decoded.userId}, (err, user) => {
            if(err) return console.log(err)
            return res.status(200).json({
                title: 'email grabbed',
                user: {
                    email: user.email
                }
            })
        })
        }
    )
    
})

// port 
const port = process.env.PORT || 5000;