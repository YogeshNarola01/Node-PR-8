const User = require('../models/userModel')
const dashboardPage = (req,res) => {
    res.render('dashboard');
}
const loginPage = (req,res) => {
    res.render('login');
}
const registerPage = (req,res )=>{
    res.render('register');
}
const registeruser = async(req,res) => {
    try {
        const {name,email,password,confirmpassword}= req.body
        if(password !== confirmpassword){
            return res.status(400).json({message:"passwords do not match"})
        }
        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({message:"email already exists"})
        }
        user = await new User({
            name,email,password
        })
        await user.save()
        return res.redirect('/auth')
    } catch (error) {
        console.log(error);
        return false
    }
}
const Loginuser = async(req,res) => {
    try {
        const  {email,password}= req.body
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({message:"email does not exist"})
        }
        if(password !== user.password){
            return res.status(400).json({message:"password is incorrect"})
        }
        res.cookie('user',{email : user.email})
        return res.redirect('/auth/dashboard')
    } catch (error) {
        console.log(error);
        return false
    }
}
module.exports = {
    dashboardPage,loginPage,registerPage,registeruser,Loginuser
}