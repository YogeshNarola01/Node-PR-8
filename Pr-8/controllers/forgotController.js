const User = require('../models/userModel')
var nodemailer = require('nodemailer');
const resetpasspage = (req,res) => {
    res.render('resetpass')
}
const otppage = (req,res ) => {
    res.render('otp')
}
const sendmail = async(req,res) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).json({message: 'User not found'})
        }
        const otp = Math.floor(Math.random()*90000)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.account_email,
              pass: process.env.account_pass
            }
          });
          
          var mailOptions = {
            from: process.env.account_email,
            to: email,
            subject: 'Recover For Your Account!',
            html :`
              <h1>Dear : - ${user.name} = your otp is : - ${otp}</h1>
            `
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            res.cookie('userReset',{email: email,otp:otp})
            return res.redirect('/forgot/otppage')
            }
          });
    } catch (error) {
        console.log(error);
        return false
    }
}
const receiveOtp = async(req,res) => {
    try {
        const  {otp} = req.body
        console.log(otp);
        console.log(req.cookies.userReset.otp);
        
        if(otp === req.cookies.userReset.otp) {
            return res.redirect('/forgot/otppage')
        }
        return res.redirect('/forgot/resetpasspage')
    } catch (error) {
        console.log(error);
        return false
    }
}
const SetPassword = async(req,res) => {
    try {
        const {password,confirmpassword} = req.body
        if(password !== confirmpassword){
            return res.redirect('/forgot/resetpasspage')
        }
        const user = await User.findOne({email:req.cookies.userReset.email})
        if(!user) {
            return res.redirect('/forgot/resetpasspage')
        }
        user.password = password
        await user.save()
        res.clearCookie('userReset')
        return res.redirect('/auth')
    } catch (error) {
        console.log(error);
        return false
    }
}
module.exports = {
    resetpasspage,otppage,sendmail,receiveOtp,SetPassword
}