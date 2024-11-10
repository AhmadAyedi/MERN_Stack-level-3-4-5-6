/*const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Can't be blank"]
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Can't be blank"],
    index: true,
    validate: [isEmail, "invalid email"]
  },
  password: {
    type: String,
    required: [true, "Can't be blank"]
  },
  picture: {
    type: String,
  },
  newMessages: {
    type: Object,
    default: {}
  },
  status: {
    type: String,
    default: 'online'
  }
}, {minimize: false});

UserSchema.pre('save', function(next){
  const user = this;
  if(!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt){
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err);

      user.password = hash
      next();
    })

  })

})


UserSchema.methods.toJSON = function(){
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

UserSchema.statics.findByCredentials = async function(email, password) {
  const user = await User.findOne({email});
  if(!user) throw new Error('invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) throw new Error('invalid email or password')
  return user
}


const User = mongoose.model('User', UserSchema);

module.exports = User*/




/*
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Can't be blank"]
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Can't be blank"],
    index: true,
    validate: [isEmail, "invalid email"]
  },
  password: {
    type: String,
    required: [true, "Can't be blank"]
  },
  picture: {
    type: String,
  },
  newMessages: {
    type: Object,
    default: {}
  },
  status: {
    type: String,
    default: 'online'
  }
}, { minimize: false });

UserSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    console.log('Password hashed:', user.password); // Debugging
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

UserSchema.statics.findByCredentials = async function(email, password) {
  const user = await this.findOne({ email });
  console.log('User found:', user); // Debugging
  if (!user) throw new Error('invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  console.log('Password match:', isMatch); // Debugging
  if (!isMatch) throw new Error('invalid email or password');
  return user;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
*/



// Importing mongoose, a library used for MongoDB object modeling in Node.js.
const mongoose = require('mongoose');

// Importing the isEmail function from the validator package to validate email addresses.
const { isEmail } = require('validator');

// Importing bcrypt, a library used for hashing passwords.
const bcrypt = require('bcrypt');

// Defining the schema for the User model, which will represent users in the database.
const UserSchema = new mongoose.Schema({
  // Name field: required string field that cannot be blank.
  name: {
    type: String,
    required: [true, "Can't be blank"]
  },
  // Email field: required string field that is unique, lowercase, indexed, and validated as a proper email address.
  email: {
    type: String,
    lowercase: true,  // Converts the email to lowercase before saving.
    unique: true,     // Ensures no two users have the same email.
    required: [true, "Can't be blank"],  // The email field cannot be empty.
    index: true,      // Creates an index on the email field for faster querying.
    validate: [isEmail, "invalid email"]  // Validates the email format using the isEmail function.
  },
  // Password field: required string field that cannot be blank.
  password: {
    type: String,
    required: [true, "Can't be blank"]
  },
  // Picture field: optional string field to store the URL of the user's profile picture.
  picture: {
    type: String,
  },
  // newMessages field: object to store messages, initialized as an empty object by default.
  newMessages: {
    type: Object,
    default: {}
  },
  // Status field: string field to track the user's online status, default is 'online'.
  status: {
    type: String,
    default: 'online'
  }
}, { minimize: false });  // Prevents Mongoose from automatically removing empty objects from the schema.

// Pre-save middleware: runs before saving a user. It hashes the password if it's new or modified.
UserSchema.pre('save', async function(next) {
  const user = this;
  // If the password hasn't been modified, skip hashing and move to the next middleware.
  if (!user.isModified('password')) return next();

  try {
    // Generate a salt for hashing the password.
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the salt and store it in the user object.
    user.password = await bcrypt.hash(user.password, salt);
    console.log('Password hashed:', user.password); // Debugging
    next();  // Proceed to save the user.
  } catch (err) {
    next(err);  // Pass any errors to the next middleware.
  }
});

// toJSON method: overrides the default method to remove the password field when converting a user to a JSON object.
UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();  // Convert the user document to a plain(vanilla) JavaScript object.
  delete userObject.password;  // Remove the password field from the object.
  return userObject;  // Return the modified object.
}

// findByCredentials method: a static method to find a user by email and verify the password.
UserSchema.statics.findByCredentials = async function(email, password) {
  // Find a user by their email address.
  const user = await this.findOne({ email });
  console.log('User found:', user); // Debugging
  // If no user is found, throw an error.
  if (!user) throw new Error('invalid email or password');

  // Compare the provided password with the hashed password stored in the database.
  const isMatch = await bcrypt.compare(password, user.password);
  console.log('Password match:', isMatch); // Debugging
  // If the passwords don't match, throw an error.
  if (!isMatch) throw new Error('invalid email or password');
  return user;  // Return the user if the password matches.
}

// Creating the User model using the UserSchema.
const User = mongoose.model('User', UserSchema);

// Exporting the User model so it can be used in other parts of the application.
module.exports = User;
