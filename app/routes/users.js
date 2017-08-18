/* Require Modules */
const moment   = require('moment');

/* Load Models */
const User     = require('../models/user');  

/* Middleware */
const loginRequired = require('../middleware/loginRequired');
const adminRequired = require('../middleware/adminRequired');

module.exports = function(app) {

    /* Profile Page */
    app.get('/profile', loginRequired, function(req, res) {
        res.render('users/show.ejs', {
            title : "Profile"
        });
    }); 

    app.get('/profile/edit', loginRequired, function(req, res) {
        res.render('users/edit.ejs', {
            title : "Edit Profile",
            user : req.user
        });
    });

    /* Profile Edit */
    app.post('/profile/edit', loginRequired, function(req, res) {
        var email = req.body.profileEmail;
        var phoneNumber = req.body.profilePhoneNumber;
        User.update({_id: req.body.userId}, {
            'local.email': email,
            'local.phoneNumber': phoneNumber,
        }, function(err, response){
            if (err) { 
                throw(err)
            } else {
                console.log('response: ' + response);
                res.redirect('/profile');
            }
        });
    });

    /* Profile Page */
    app.get('/users', loginRequired, adminRequired, function(req, res) {
        User.find({}, function(error, users){
            res.render('users/list.ejs', {
                title : "User List",
                users: users,
            });
        });
    });    

    /* Profile Page */
    app.get('/users/:username', loginRequired, function(req, res) {
        User.findOne({"local.username": req.params.username}, function(error, user){
            res.render('users/show.ejs', {
                title : "User Profile",
                user: user
            });
        });
    }); 

}; // end module export