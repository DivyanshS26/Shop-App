const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/users')

// router.get('/fakeuser', async (req, res) => {

//     const user = new User({
//         username: 'divyansh',
//         email: 'divyansh@gmail.com'
//     });

//     const newUser = await User.register(user, 'div123');

//     res.send(newUser);

// })
// get the signup form
router.get('/register', (req, res) => {
    res.render('auth/signup');
})
// register the new user in the database
router.post('/register', async (req, res) => {

    try {
        const { username, email, password } = req.body

        const user = new User({
            username: username,
            email: email
        });

        await User.register(user, password);

        req.flash('success', `Welcome ${username},Please login to continue`)
        res.redirect('/products');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }


});

// get the login page

router.get('/login', (req, res) => {
    res.render('auth/login');
})


router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true })
    , (req, res) => {

        const {username}=req.user;
        req.flash('success',`Welcome Back Again ${username}!!`);
        res.redirect('/products');
    });

router.get('/logout',(req,res)=>{

    req.logout();
    req.flash('success','Logged out Successfully!!');
    res.redirect('/login');

});

module.exports = router;