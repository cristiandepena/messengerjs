const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req,res)=> {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    // Connected
    socket.on('user connected', (user) => {
        socket.user = user;
        io.emit('user connected', user);
    });

    // Receive message
    socket.on('chat message', (user, msg) => {
        socket.broadcast.emit('chat message', user, msg);
    });
    // Disconnected
    socket.on('disconnect', () => {
        io.emit('disconnected', socket.user);
    });
});

http.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});