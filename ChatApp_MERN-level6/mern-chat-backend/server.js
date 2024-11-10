/*const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes')
const User = require('./models/User');
const Message = require('./models/Message')
const rooms = ['general', 'tech', 'finance', 'crypto'];
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/users', userRoutes)
require('./connection')

const server = require('http').createServer(app);
const PORT = 5001;
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})


async function getLastMessagesFromRoom(room){
  let roomMessages = await Message.aggregate([
    {$match: {to: room}},
    {$group: {_id: '$date', messagesByDate: {$push: '$$ROOT'}}}
  ])
  return roomMessages;
}

function sortRoomMessagesByDate(messages){
  return messages.sort(function(a, b){
    let date1 = a._id.split('/');
    let date2 = b._id.split('/');

    date1 = date1[2] + date1[0] + date1[1]
    date2 =  date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1
  })
}

// socket connection

io.on('connection', (socket)=> {

  socket.on('new-user', async ()=> {
    const members = await User.find();
    io.emit('new-user', members)
  })

  socket.on('join-room', async(newRoom, previousRoom)=> {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await getLastMessagesFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit('room-messages', roomMessages)
  })

  socket.on('message-room', async(room, content, sender, time, date) => {
    const newMessage = await Message.create({content, from: sender, time, date, to: room});
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    // sending message to room
    io.to(room).emit('room-messages', roomMessages);
    socket.broadcast.emit('notifications', room)
  })

  app.delete('/logout', async(req, res)=> {
    try {
      const {_id, newMessages} = req.body;
      const user = await User.findById(_id);
      user.status = "offline";
      user.newMessages = newMessages;
      await user.save();
      const members = await User.find();
      socket.broadcast.emit('new-user', members);
      res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(400).send()
    }
  })

})


app.get('/rooms', (req, res)=> {
  res.json(rooms)
})


server.listen(PORT, ()=> {
  console.log('listening to port', PORT)
})*/

/*
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');
const Message = require('./models/Message');
const rooms = ['general', 'tech', 'finance', 'crypto'];
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
require('./connection');

const server = require('http').createServer(app);
const PORT = 5001;
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

async function getLastMessagesFromRoom(room) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: '$date', messagesByDate: { $push: '$$ROOT' } } }
  ]);
  return roomMessages;
}

function sortRoomMessagesByDate(messages) {
  return messages.sort(function(a, b) {
    let date1 = a._id.split('/');
    let date2 = b._id.split('/');

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1;
  });
}

// Socket connection
io.on('connection', (socket) => {
  socket.on('new-user', async () => {
    const members = await User.find();
    io.emit('new-user', members);
  });

  socket.on('join-room', async (newRoom, previousRoom) => {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await getLastMessagesFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit('room-messages', roomMessages);
  });

  socket.on('message-room', async (room, content, sender, time, date) => {
    const newMessage = await Message.create({ content, from: sender, time, date, to: room });
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    io.to(room).emit('room-messages', roomMessages);
    socket.broadcast.emit('notifications', room);
  });

  app.delete('/logout', async (req, res) => {
    try {
      const { _id, newMessages } = req.body;
      const user = await User.findById(_id);
      user.status = "offline";
      user.newMessages = newMessages;
      await user.save();
      const members = await User.find();
      socket.broadcast.emit('new-user', members);
      res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(400).send();
    }
  });
});

app.get('/rooms', (req, res) => {
  res.json(rooms);
});

server.listen(PORT, () => {
  console.log('Listening to port', PORT);
});
*/

// Importing the Express.js framework.
const express = require('express');

// Initializing an Express application instance.
const app = express();

// Importing user-related routes from the userRoutes file.
const userRoutes = require('./routes/userRoutes');

// Importing the User model to interact with the User collection in MongoDB.
const User = require('./models/User');

// Importing the Message model to interact with the Message collection in MongoDB.
const Message = require('./models/Message');

// Defining an array of available chat rooms.
const rooms = ['general', 'tech', 'finance', 'crypto'];

// Importing and enabling Cross-Origin Resource Sharing (CORS) middleware to allow requests from different origins.
const cors = require('cors');

// Middleware to parse URL-encoded data with the querystring library (extended: true).
app.use(express.urlencoded({ extended: true }));

// Middleware to parse incoming JSON requests.
app.use(express.json());

// Middleware to enable CORS for all routes.
app.use(cors());

// Using the userRoutes middleware for all routes starting with '/users'.
app.use('/users', userRoutes);

// Importing the connection module to connect to the MongoDB database.
require('./connection');

// Creating an HTTP server instance using the Express app.
const server = require('http').createServer(app);

// Setting the port number for the server to listen on.
const PORT = 5001;

// Initializing a Socket.IO instance on the HTTP server with CORS settings.
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000', // Allowing requests from this origin (React frontend).
    methods: ['GET', 'POST'] // Allowing these HTTP methods for CORS.
  }
});

// Asynchronous function to get the last messages from a specific room, grouped by date.
async function getLastMessagesFromRoom(room) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } }, // Matching messages sent to the specified room.
    { $group: { _id: '$date', messagesByDate: { $push: '$$ROOT' } } } // Grouping messages by date.
  ]);
  return roomMessages;
}

// Function to sort room messages by date (formatted as MM/DD/YYYY) in ascending order.
function sortRoomMessagesByDate(messages) {
  return messages.sort(function(a, b) {
    let date1 = a._id.split('/'); // Splitting date1 into MM, DD, YYYY.
    let date2 = b._id.split('/'); // Splitting date2 into MM, DD, YYYY.

    // Reordering date strings to YYYYMMDD for comparison.
    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    // Returning comparison result for sorting.
    return date1 < date2 ? -1 : 1;
  });
}

// Handling Socket.IO connection event when a user connects.
io.on('connection', (socket) => {

  // Listening for 'new-user' event, fetching all users, and emitting them to all clients.
  socket.on('new-user', async () => {
    const members = await User.find();
    io.emit('new-user', members);
  });

  // Listening for 'join-room' event to switch a user between chat rooms.
  socket.on('join-room', async (newRoom, previousRoom) => {
    socket.join(newRoom); // Joining the new room.
    socket.leave(previousRoom); // Leaving the previous room.
    
    // Fetching and sorting the last messages from the new room.
    let roomMessages = await getLastMessagesFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    
    // Emitting the sorted messages to the user who joined the room.
    socket.emit('room-messages', roomMessages);
  });

  // Listening for 'message-room' event to handle sending messages to a specific room.
  socket.on('message-room', async (room, content, sender, time, date) => {
    // Creating a new message in the Message collection.
    const newMessage = await Message.create({ content, from: sender, time, date, to: room });
    
    // Fetching and sorting the last messages from the room.
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    
    // Emitting the sorted messages to all users in the room.
    io.to(room).emit('room-messages', roomMessages);
    
    // Broadcasting a notification to all users except the sender.
    socket.broadcast.emit('notifications', room);
  });

  // Route to handle user logout.
  app.delete('/logout', async (req, res) => {
    try {
      const { _id, newMessages } = req.body; // Extracting user ID and new messages from the request body.
      const user = await User.findById(_id); // Finding the user by ID.
      user.status = "offline"; // Setting the user's status to offline.
      user.newMessages = newMessages; // Updating the user's new messages.
      await user.save(); // Saving the updated user document.

      // Fetching all users and broadcasting the updated list.
      const members = await User.find();
      socket.broadcast.emit('new-user', members);

      // Sending a success response to the client.
      res.status(200).send();
    } catch (e) {
      console.log(e); // Logging the error if any.
      res.status(400).send(); // Sending an error response to the client.
    }
  });
});

// Route to get the list of available chat rooms.
app.get('/rooms', (req, res) => {
  res.json(rooms); // Responding with the list of rooms in JSON format.
});

// Starting the server and listening on the specified port.
server.listen(PORT, () => {
  console.log('Listening to port', PORT);
});
