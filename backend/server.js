require("dotenv").config(); //imports config from .env file
const express = require("express");
const mongoose = require("mongoose");
const http = require("http")
const cors = require("cors")

const {Server} = require("socket.io")




const documentRoutes = require("./routes/routing");
const MemberListRoutes = require("./routes/routingMemberList");
const UserRoutes = require("./routes/UserRoute");
const PostRoutes = require("./routes/PostRoute");
const EventRoutes = require("./routes/EventRoute");
const WorkRoutes = require("./routes/WorkRoute");






//express app
const app = express();
app.use(cors())



////////////////////SOCKET.IO//////////////////////
const io = new Server(4001, {
  cors:true
})

const studentIdToSocketIdMap = new Map()
const socketIdToStudentIdMap = new Map()


// socket.io
io.on('connection', socket =>{
  console.log(`Socket connected ${socket.id}`)
  socket.on('board:join', data =>{
    
    const { studentID, board } = data
    console.log(studentID, board)
    studentIdToSocketIdMap.set(studentID, socket.id)
    socketIdToStudentIdMap.set(socket.id, studentID)
    io.to(board).emit('user:joined', {studentID, id: socket.id})
    socket.join(board)
    io.to(socket.id).emit('board:join', data)
  })

  socket.on('board:create', data =>{
    
    const { studentID, board } = data
    console.log(studentID, board)
    studentIdToSocketIdMap.set(studentID, socket.id)
    socketIdToStudentIdMap.set(socket.id, studentID)
    io.to(board).emit('user:joined', {studentID, id: socket.id})
    socket.join(board)
    io.to(socket.id).emit('board:join', data)
  })

  socket.on("user:call", ({to, offer }) =>{
    io.to(to).emit('incoming:call', {from: socket.id, offer})
  })
  socket.on("call:accepted", ({to, ans}) =>{
    io.to(to).emit('call:accepted', {from: socket.id, ans})
  })
  socket.on('peer:nego:needed', ({to, offer}) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit('peer:nego:needed', {from: socket.id, offer})
  })
  socket.on('peer:nego:done', ({to, ans}) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit('peer:nego:final', {from: socket.id, ans})
  })
})







////////////////////SOCKET.IO//////////////////////

// middleware - executes everytime a request is done
app.use(express.json()); //looks if the request has any body, if yes, attaches it to req handler
// will enable us to use req.body
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //when connection is established
    // listen for requests only when connection is established
    app.listen(process.env.PORT, () => {
      // PORT variable is in the .env file, accessed through process.env
      console.log(`connected to db and listening on port ${process.env.PORT}!!!`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// routes
app.use("/api/documents/demo", documentRoutes); //when we fire a request to given route, use workoutRoutes
app.use("/api/members", MemberListRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/posts", PostRoutes);
app.use("/api/events", EventRoutes)
app.use("/api/works", WorkRoutes)
