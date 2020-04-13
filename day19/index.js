const app = require('express')();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const dateTime = require('./date-time');
const port = 3000 || process.env.PORT;

app.use(bodyParser.json());

// handle signup
app.post('/signup', (req, res) => {
  // ensures that email, username and password are provided 
  if (!(req.body.email)) 
    return res.status(401).json({message: 'Please provide a valid email'});
  else if (!(req.body.username))
    return res.status(401).json({message: 'Please provide a valid username'});
  else if (!(req.body.password))
    return res.status(401).json({message: 'Please provide a password'});

  // hash the password from req.body 
  bcrypt.hash(req.body.password, 10)
    .then(hashed => {
      // create a new user
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashed,
        date: dateTime.date(),
        time: dateTime.time()
      });
      // save and return the user
      user.save()
        .then(() => res.status(201).json({
          message: 'User successfully created!',
          email: user.email,
          username: user.username 
        }))
        .catch(err => {
          // check if username or email are not unique and return proper message
          if (err.name === 'ValidationError') {
            let messages = [];
            for (let [key, value] of Object.entries(err.errors)) {
              messages.push(`User with ${key}: ${value.value} exists already`);
            }
            const returnMessage = messages.join('\n').concat('.');
            return res.status(401).json({message: returnMessage});
          }
          res.status(500).json(err);
        }); 
    }).catch(err => res.status(500).json(err));
});

// handle login
app.post('/login', async (req, res) => {
  // lookup the user with email or username provided from the database
  let user;
  if (req.body.email || req.body.username) {
    try {
      if (req.body.email) {
        user = await User.findOne({email: req.body.email});
      } else if (req.body.username) {
        user = await User.findOne({username: req.body.username});
      }
    } catch(error) {
      return res.status(401).json(error);
    }
  } else {
    // return if no email or username is passed to the body
    return res.status(401).json({message: 'Please provide a valid email or username to login.'});
  }

  // if a user was not found return the message that user was not found
  if (!user) return res.status(401).json({
    message: `User${req.body.email ? ' with email: ' + req.body.email : req.body.username ? 
      ' with username: ' + req.body.username : '' } not found, please correct your details or sign up.`
  });

  // ensures that a password was passed
  if (!(req.body.password))
    return res.status(401).json({message: 'Please provide a password'});

  // check if passwords match
  bcrypt.compare(req.body.password, user.password)
    .then(valid => {
    // if passwords match return succesful login message with token
    if (valid) { 
      // token signing
      const token = jwt.sign({email: user.email}, 'RandoM_SECreT', {expiresIn: '15m'})
      return res.status(201).json({
        message: 'Login successful!',
        email: user.email,
        username: user.username,
        token: token
      });
    } else { 
     // else return message of wrong password
      return res.status(401).json({message: 'Wrong password, please login with correct password.'});
    }
  }).catch(err => res.status(500).json(err));
});

// handle getuser 
app.get('/getuser', async (req, res) => {
  // ensures a valid email was passed as parameter 
  if (!(req.query.email))
    return res.status(400).json({message: 'Please pass a valid email as an email URL parameter'});

  // retrieve the user from the database 
  let user;
  try {
   user = await User.findOne({email: req.query.email});
  } catch(error) {
    res.status(500).json(error);
  }

  // check if there's a valid user with the provided email was not returned from the database
  if (!user) {
    // if so return message that user with specified email was not found
    res.status(400).json({message: `User with email: ${req.query.email}, not found!`});
  } else { 
    // if there's a user, check the authorization for token matching
    try {
      // get the token from request headers
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'RandoM_SECreT');
      if (decodedToken.email === user.email) { 
        // return the user's email, date and time if they match
        return res.status(200).json({
          _id: user._id,
          email: user.email,
          username: user.username,
          date: user.date,
          time: user.time
        });
      } else {
        throw new Error('Invalid Request');
      }
    } catch(error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(400).json({
          message: 'Session expired, please login again'
        });
      } else {
        return res.status(400).json({message: 'Invalid Request'});
      }
    }
  }
});

module.exports = app.listen(port);