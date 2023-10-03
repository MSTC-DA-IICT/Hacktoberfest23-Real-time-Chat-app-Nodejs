//Node server yo handle socket io connections

const Io = require('socket.io')(8000)

const users = {}

Io.on('connection', socket =>{
    socket.on('new-user-joined',name1=>{
        console.log("New user",name1)
        users[socket.id] =name1;
        socket.broadcast.emit('user-joined',name1);
    });

    socket.on('send',message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
})