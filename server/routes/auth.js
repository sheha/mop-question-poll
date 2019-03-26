import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import User from '../persistence/models/user';
import environment from '../conf/environment';

const router = express.Router();

let getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// Register new users
router.post('/register', function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({
            success: false,
            message: 'Please enter email and password.'
        });
    } else {
        let newUser = new User({
            email: req.body.email,
            password: req.body.password
        });

        // Attempt to save the user
        newUser.save(function (err) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'That email address already exists.'
                });
            }
            res.json({
                success: true,
                message: 'Successfully created new user.'
            });
        });
    }
});



router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/signin', (req, res) => {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.send({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else {
            // Check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // Create token if the password matched and no error was thrown
                    var token = jwt.sign(
                      user,
                      environment.AUTH_SECRET,
                      {
                        expiresIn: "2 days"
                      }
                    );
                    res.json({
                        success: true,
                        message: 'Authentication successfull',
                        token
                    });
                } else {
                    res.send({
                        success: false,
                        message: 'Authentication failed. Passwords did not match.'
                    });
                }
            });
        }
    });
});

router.get('signout', passport.authenticate('jwt', { session: false }), function (req, res) {
    req.logout();
    res.json({
        success: true, msg: 'Signed out successfully!'
    });

});


// // Example of required auth: protect dashboard route with JWT
// router.get('/dashboard', passport.authenticate('jwt', {
//     session: false
// }), function (req, res) {
//     res.send('It worked! User id is: ' + req.user._id + '.');
//     });

// router.post('/book', passport.authenticate('jwt', { session: false }), function (req, res) {
//     var token = getToken(req.headers);
//     if (token) {
//         console.log(req.body);
//         var newBook = new Book({
//             isbn: req.body.isbn,
//             title: req.body.title,
//             author: req.body.author,
//             publisher: req.body.publisher
//         });

//         newBook.save(function (err) {
//             if (err) {
//                 return res.json({ success: false, msg: 'Save book failed.' });
//             }
//             res.json({ success: true, msg: 'Successful created new book.' });
//         });
//     } else {
//         return res.status(403).send({ success: false, msg: 'Unauthorized.' });
//     }
// });

// router.get('/book', passport.authenticate('jwt', { session: false }), function (req, res) {
//     var token = getToken(req.headers);
//     if (token) {
//         Book.find(function (err, books) {
//             if (err) return next(err);
//             res.json(books);
//         });
//     } else {
//         return res.status(403).send({ success: false, msg: 'Unauthorized.' });
//     }
// });




module.exports = router;
