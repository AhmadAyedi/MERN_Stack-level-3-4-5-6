/*const router = require('express').Router();
const User = require('../models/User');

// creating user
router.post('/', async(req, res)=> {
  try {
    const {name, email, password, picture} = req.body;
    console.log(req.body);
    const user = await User.create({name, email, password, picture});
    res.status(201).json(user);
  } catch (e) {
    let msg;
    if(e.code == 11000){
      msg = "User already exists"
    } else {
      msg = e.message;
    }
    console.log(e);
    res.status(400).json(msg)
  }
})

// login user

router.post('/login', async(req, res)=> {
  try {
    const {email, password} = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = 'online';
    await user.save();
    res.status(200).json(user);
  } catch (e) {
      res.status(400).json(e.message)
  }
})


module.exports = router*/


/*
const router = require('express').Router();
const User = require('../models/User');

// Creating user
router.post('/', async (req, res) => {
  try {
    const { name, email, password, picture } = req.body;
    console.log('Creating user with:', req.body); // Debugging
    const user = await User.create({ name, email, password, picture });
    res.status(201).json(user);
  } catch (e) {
    let msg;
    if (e.code === 11000) {
      msg = "User already exists";
    } else {
      msg = e.message;
    }
    console.log('Error during user creation:', e); // Debugging
    res.status(400).json(msg);
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt with:', req.body); // Debugging
    const user = await User.findByCredentials(email, password);
    user.status = 'online';
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    console.log('Login error:', e); // Debugging
    res.status(400).json(e.message);
  }
});

module.exports = router;

*/





// Importing the Router function from Express to create a new router instance.
const router = require('express').Router();

// Importing the User model, which represents users in the MongoDB database.(nista3mlo .. loula bch no5rjo m folder lia7na fiha w 4enia bch n3awdo nod5lo f folder jdida)
//louken majinesh fi wost folder win7ibo juste nod5lo fi folder jdida nista3mlo . wa7da
const User = require('../models/User');


// Route for creating a new user.
router.post('/', async (req, res) => {
  try {
    // Extracting the name, email, password, and picture from the request body.
    const { name, email, password, picture } = req.body;
    console.log('Creating user with:', req.body); // Debugging: logging the request body for debugging purposes.

    // Creating a new user document in the database with the provided data.
    const user = await User.create({ name, email, password, picture });

    // Sending a response with status 201 (Created) and the newly created user as JSON.
    res.status(201).json(user);
  } catch (e) {
    let msg;
    // Checking if the error code is 11000, which indicates a duplicate key error (e.g., the email already exists).
    if (e.code === 11000) {
      msg = "User already exists";  // Custom error message for duplicate user.
    } else {
      msg = e.message;  // Default error message.
    }
    console.log('Error during user creation:', e); // Debugging: logging the error for debugging purposes.

    // Sending a response with status 400 (Bad Request) and the error message as JSON.
    res.status(400).json(msg);
  }
});

// Route for logging in a user.
router.post('/login', async (req, res) => {
  try {
    // Extracting the email and password from the request body.
    const { email, password } = req.body;
    console.log('Login attempt with:', req.body); // Debugging: logging the request body for debugging purposes.

    // Finding a user by email and verifying the password using the findByCredentials method.
    const user = await User.findByCredentials(email, password);

    // Setting the user's status to 'online' after a successful login.
    user.status = 'online';

    // Saving the updated user document to the database.
    await user.save();

    // Sending a response with status 200 (OK) and the logged-in user as JSON.
    res.status(200).json(user);
  } catch (e) {
    console.log('Login error:', e); // Debugging: logging the error for debugging purposes.

    // Sending a response with status 400 (Bad Request) and the error message as JSON.
    res.status(400).json(e.message);
  }
});

// Exporting the router so it can be used in other parts of the application.
module.exports = router;
