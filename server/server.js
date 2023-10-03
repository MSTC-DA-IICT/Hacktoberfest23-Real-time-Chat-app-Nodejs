// Node server to handle socket.io connections
const Io = require('socket.io')(8000);

const users = {};

Io.on('connection', socket => {
    socket.on('new-user-joined', name1 => {
        console.log("New user", name1);
        users[socket.id] = name1;
        // Broadcast the username and a message
        socket.broadcast.emit('user-joined', { name: name1, message: 'has joined the chat' });
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });
});
