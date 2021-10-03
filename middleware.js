

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You need to Login first');
        return res.redirect('/login');
    }
    next();

}

// const isSeller=(req,res,next)=>{
//     if(!req.isAuthenticated()){

//     }
// }

module.exports = {
    isLoggedIn
}