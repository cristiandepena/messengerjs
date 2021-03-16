const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req,res)=> {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    // Connected
    console.log('User connected');
    io.emit('user connected');

    // Receive message
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    // Disconnected
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});