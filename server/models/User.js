const mongoose = require('mongoose');
const uri = "mongodb+srv://dalia:dalia1010@cluster0.viyka.mongodb.net/covid_app?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err, connection) =>{
    if (err) {
        console.log(err)
    } else {
        console.log("Connected successfully to server");
    }
})
const User = mongoose.model('User', new mongoose.Schema({ //this is connection user
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    surname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    phone_number: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },

    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },

}));
 

 
module.exports = User;
