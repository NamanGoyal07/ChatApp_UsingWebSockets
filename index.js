let express = require('express');
let socket = require('socket.io');
// App Setup

let app = express();
let server = app.listen(4000,function(){
    console.log("Listening to requests");
});

// Static files

app.use(express.static('public'));

// Socket Setup
let io = socket(server);
io.on('connection',function(socket){
    console.log("Connection established",JSON.stringify(socket.id));

    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });

});


