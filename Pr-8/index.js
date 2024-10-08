const express = require('express')
const ConnectDb = require('./config/db')
const app = express()
const port = 3000
const path = require('path')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
dotenv.config()
ConnectDb()
app.set("view engine" , "ejs")
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())
app.use('/',require('./routes/indexroutes'))

app.listen(port,(err)=>{
    if(err) console.log(err)
    console.log(`Server Running On The Port = ${port}`);
})