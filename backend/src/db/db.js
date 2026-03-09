//connect the database in db.js
// create a function to connect the database

const mongoose = require('mongoose')


function connectDb(){
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("mongodb connected")
    }).catch((err)=>{
        console.log("there's an error while connecting mongodb: ",err);
    })
}


module.exports = connectDb