const express = require('express');
const http = require('http');
const path = require('path');
const {Server} = require("socket.io");



const app = express();
const server = http.createServer(app);
const io = new Server(server);

// io is to handle the socket.io or websocket
// if the frotend makes a connection with the backend
io.on('connection', socket =>{
    // console.log("A user is Connected", socket.id);
    // whenever we get a user-message as event from frontend
    // then transfer to all the user using io.emit
    // means if the server gets a message it will emit it to all the users
    socket.on('user-message', message => {
        // console.log('A new user message', message);
        io.emit('message', message)
    })
})


// to handle the http requests
app.use(express.static(path.resolve("./public")))

app.get("/", (req, res) => {
    return res.sendFile("/public/index.html")
});


server.listen(9000, () => console.log('Server Started at PORT: 9000'));
