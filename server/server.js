//Node server yo handle socket io connections

const Io = require('socket.io')(8000)

const users = {}

Io.on('connection', socket =>{
    socket.on('new-user-joined',name=>{
        console.log("New user",name)
        users[socket.id] =name;
        socket.broadcast.emit('user-joined',name);
    })

    socket.on('send',message =>{
        socket.broadcast.emit('receive', {message: message, name: user[socket.id]})
    })
})