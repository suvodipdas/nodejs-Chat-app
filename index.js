//Node server which will handle socket.io connection

const io = require('socket.io')(8000,{
    cors: {
        origin: "http://localhost:8000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
    credentials: true
      }
});

const users={};

io.on('connection', socket =>{
    //if any user joined, let others know
    socket.on('new-user-joined',name =>{
        // console.log("new user ",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-join',name);
    });
    //send massage and broadcast to other people
    socket.on('send', massage =>{
        socket.broadcast.emit('receive',{massage: massage,name: users[socket.id]});
    });
    //if any user disconnect, let other know
    socket.on('disconnect', massage =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});
