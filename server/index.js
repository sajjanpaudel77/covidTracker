
const User = require('./models/User')
const cors = require('cors')
const path = require('path');
const admin = require('./routes/admin')


const express = require('express');
const app = express();
app.set("view_engine", "ejs");
app.set("views", "templates");


app.use(cors());

app.use(express.urlencoded({ extended: true }))//use this to make our server understand data sended from form
app.use(express.json())//this to make express understand post request to change javascript into json
// app.use('/users',users)

app.use('/admin',admin)//separate routes source


app.post('/login', (req, respond) => {
    User.findOne(req.body, (err, res) => {
        if (res == null) {
            respond.json(null)
        } else {
            respond.json(res)
        }
    })
})
app.post('/newAccount', (req, respond) => {
    console.log(req.body)
    User.find(req.body, (err, res) => {
        console.log(res)
        if(err){
            console.log(err)
            respond.json(null)
        }else{
        if (res.length == 0) {
            User.create(req.body, (err, res) => {
                respond.json(res)
            })
        }else{
            respond.json(null)
        }
    }
    })
})



const loginA = 'admin'
const passwordA = 'amin@2020'

//REST API
app.route('/admin_dashboard')
    .get((request, respond) => {
        respond.sendFile(path.join(__dirname + '/admin_login_page.html'))
    })

    .post((request, respond) => {
        const { login, password } = request.body
        if (login == loginA && password == passwordA) {
            User.find({}, (error, result) => {
                respond.render('admin_dashboard.ejs', { users: result })
            })
        } else {
            respond.send('Wrong Input! Please check!')
        }
    })

app.route('/user_dashboard')
    .get((request, respond) => {
        respond.sendFile(path.join(__dirname + '/user_login_page.html'))
    })
    .post((request, respond) => {
        const { login, password } = request.body
        User.find({ email: login, password: password }, (error, result) => {
            if (result.length) {
                // console.log(result)
                respond.render('admin_dashboard.ejs', { users: result })
            } else {
                respond.send('Wrong Input! Please check!')
            }
        })

    })

app.listen(4444, () => console.log('server was started'))