const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Task = require('./models/Task');
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

//get logged in user data
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

//add task 
app.post('/add-task', (req,res) => {
    console.log(req.body)
    const newtask = new Task({
        title: req.body.title,
        details: req.body.details,
        type: req.body.type
    })
    newtask.save(err => {
        if(err) {
            console.log(err)
            return res.status(400).json({
                title: 'error',
                error: 'task already exist'
            })
        }
            return res.status(200).json({
            title: 'success',
            message: 'Task successfully added'
        })
    })
})

// get all tasks
app.get('/tasks', (req, res) => {
    Task.find({}, (err, tasks) => {
        if(err) {
            return res.status(400).json({
                title: 'error',
                error: 'no tasks available'
            })
        }
        return res.status(200).json({
            title: 'Tasks grabbed',
            tasks
        })
    })
})

//get task for edit 
app.get('/task/:id', (req, res) => {
    Task.findOne({_id:req.params.id}, (err, task) => {
        if(err) {
            return res.status(400).json({
                title: 'error',
                error: err
            })
        }
        return res.status(200).json({
            title: 'task detail grabbed',
            task
        })
    })
})

//edit task 
app.put('/task/edit/:id', (req, res) => {

    Task.findOneAndUpdate({_id: req.params.id}, {
        title: req.body.title,
        details: req.body.details,
        type: req.body.type
    }, {new:true}, (err, task) => {
        if(err) {
            return res.status(400).json({
                 code: 400, message: "Employee updated failed." 
            })
        }
        return res.status(200).json({
            code: 200, message: "Employee updated successfully",
            updateEmployee: task
        })
    })
})


//update task status done
app.put('/task/edit-status/done', (req, res) => {
    const idsTrue = req.body.filter(task => task.done === true).map(task => task._id)
    Task.updateMany(
        { _id: {$in: idsTrue}},
        { $set: {done: true}},
        (err, data) => {
            if(err) {
                return res.status(404).json({
                    error: err
                })
            }
            return res.status(200).json({
                title:'update success'
            })
        }
    )
})
//update task status not done
app.put('/task/edit-status/not-done', (req, res) => {
    const idsFalse = req.body.filter(task => task.done === false).map(task => task._id)
    Task.updateMany(
        { _id: {$in: idsFalse}},
        { $set: {done: false}},
        (err, data) => {
            if(err) {
                return res.status(404).json({
                    error: err
                })
            }
            return res.status(200).json({
                title:'update success'
            })
        }
    )
})

//delete a task
app.delete('/tasks/:id', (req, res) => {
    Task.deleteOne({_id: req.params.id}, (err, task) => {
        if(err) {
            return res.status(400).json({
                title: 'error',
                error: err
            })
        }
        return res.status(200).json({
            title: 'success',
            message: 'Successfully deleted'
        })
    })
})

app.post('/tasks/completed', (req, res) => {
    const ids = req.body
    Task.deleteMany(
        {_id: {$in: ids}},
        (err, data) => {
            if(err){
                return res.status(400).json({
                    message: 'delete item failed'
                })
            }
            return res.status(200).json({
                message: 'Successfully deleted'
            })
        }
    )
})
// port 
const port = process.env.PORT || 5000;