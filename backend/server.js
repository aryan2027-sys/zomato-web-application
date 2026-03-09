// In server.js the server is actually started and it should be created in the root folder of the backend folder
require('dotenv').config()
const app = require('./src/app')
const connectDb = require('./src/db/db')

connectDb()
// Start the server using app.listen method
app.listen(3000, ()=>{
    console.log("server is started at port 3000")
})