/* Require Environment Variables if they don't exist */
if (!process.env.S3_BUCKET){
    require('./config/env.js');
}

/* Require Modules */
const express      = require('express');
const aws          = require('aws-sdk');
const app          = express();
const mongoose     = require('mongoose');
const passport     = require('passport');
const flash        = require('connect-flash');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);

/* Configure */
const port     = process.env.PORT || 3000;
const configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(session({ 
	secret: 'ilovethisnodejstemplate',
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(__dirname + '/public'));


const User        = require('./app/models/user');
const Collective  = require('./app/models/collective');
const Location    = require('./app/models/location');

app.use(function (req, res, next) {
    res.locals.appTitle = process.env.APP_TITLE;
    res.locals.appAdmin = process.env.APP_ADMIN;
    if (req.user) {
        User
        .findOne({_id: req.user._id})
        .populate("collectives")
        .exec(function(error, user){
            if(error){ 
                console.log(error);
                res.locals.user = req.user; 
            } else {
                res.locals.user = user;
            }
            res.locals.isLoggedIn = true;
            Collective
            .find({},{},{sort: {name: 1}})
            .exec(function(error, collectives){
                if(error){ 
                    console.log(error);
                    res.locals.collectives = null; 
                } else {
                    res.locals.collectives = collectives;
                    Location
                    .find({},{},{sort: {name: 1}})
                    .exec(function(error, locations){
                        res.locals.locations = locations;
                        return next();
                    });                  
                }
            });
        });
    } else {
        Collective
        .find({},{},{sort: {name: 1}})
        .exec(function(error, collectives){
            if(error){ 
                console.log(error);
                res.locals.collectives = null; 
            } else {
                res.locals.collectives = collectives;
            }
            res.locals.user = null;
            res.locals.isLoggedIn = false;
            Location
            .find({},{},{sort: {name: 1}})
            .exec(function(error, locations){
                res.locals.locations = locations;
                return next();
            });
        });
    }
    //return next(); 
});

// app.use(function(req, res, next){
//   res.status(404);

//   // respond with html page
//   if (req.accepts('html')) {
//     res.render('static/404.ejs', { 
//         url: req.url,
//         title: "404 - Page Not Found" 
//     });
//     return;
//   }

//   // respond with json
//   if (req.accepts('json')) {
//     res.send({ error: 'Not found' });
//     return;
//   }

//   // default to plain-text. send()
//   res.type('txt').send('Not found');
// });

/* Routes */
require('./app/routes/passport.js')(app, passport);
require('./app/routes/static.js')(app); 
require('./app/routes/users.js')(app);
require('./app/routes/collectives.js')(app);
require('./app/routes/events.js')(app);
require('./app/routes/locations.js')(app);

/* Launch */
app.listen(port, function () {
	console.log('Application Started...');
	console.log('Open your browser and go to localhost:' + port);
});