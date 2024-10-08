const IsLoggedin = async(req,res,next) => {
    try {
        const token = req.cookies.user
        if(!token) {
            return res.redirect('/auth')
        }
        next()
    } catch (error) {
        console.log(error);
        return false
    }
}
const IsNotlogin = async(req,res,next) => {
    try {
        const token = req.cookies.user
        if(token) {
            return res.redirect('/auth/dashboard')
        }
        next()
    } catch (error) {
        
    }
}
const IsTokenForReset = async(req,res,next) => {
    try {
        const token = req.cookies.userReset
        if(!token) {
            return res.redirect('/auth')
        }
        next()
    } catch (error) {
        console.log(error);
        return false
    }
}
module.exports = {IsLoggedin,IsNotlogin,IsTokenForReset}