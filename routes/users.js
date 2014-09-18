var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
mongoose.connect('mongodb://localhost/test');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passportLocalMongoose = require('passport-local-mongoose');

var options = {
    usernameField: "email",         // Necessary for email "usernames"
    usernameLowerCase: true,        // emails not case-sensitive
    lastLoginField: "lastLogin",    // user.lastLogin will return the last login
    attemptsField: "failedAttempts" // user.failedAttempts returns # of failed attempts since last login
};

var userSchema = mongoose.Schema({
    username:    { required: true, type: String, unique: true },
    password: { required: true, type: String }
});
userSchema.plugin(passportLocalMongoose);     // uses up the plugin to:
                                        // Give username, hash, and salt field
                                        // Also adds some methods to the Schema

// The mongoose model now has the Passport-Local-Mongoose plugged in
var User = mongoose.model('User', userSchema);



// NOTE: Uses "createStrategy" instead of "authenticate"
passport.use( new LocalStrategy(User.authenticate()) );
//passport.use( User.createStrategy() );

// Use the static serialize & deserialize of model for passport session support
passport.serializeUser( User.serializeUser() );
passport.deserializeUser( User.deserializeUser() );




/* SIGNUP FUNCTIONALITY ========================= */
// points to /users
router.post('/', function(req, res) {
  // Check to see if the User exists in the database
  // If doesn't exist, then register it with their information
  console.log(req.body);
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
      if (err){ return res.json('500', "There's an error with .register()"); }
                // todo: should tell the user that signup didn't work

      passport.authenticate('local')(req, res, function() {
          res.json(200, "Successful registration.");
      });
  });
});

/* LOGIN FUNCTIONALITY =================== */
router.post('/login', passport.authenticate('local'), function(req, res) {

});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
