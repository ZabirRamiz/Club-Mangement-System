require("dotenv").config(); //imports config from .env file
const express = require("express");
const documentRoutes = require("./routes/routing");
const MemberListRoutes = require("./routes/routingMemberList");
const mongoose = require("mongoose");
const UserRoutes = require("./routes/User/UserRoute");

//express app
const app = express();

// middleware - executes everytime a request is done
app.use(express.json()); //looks if the request has any body, if yes, attaches it to req handler
// will enable us to use req.body
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //when connection is established
    // listen for requests only when connection is established
    app.listen(process.env.PORT, () => {
      // PORT variable is in the .env file, accessed through process.env
      console.log("connected to db and listening on port 4000!!!");
    });
  })
  .catch((error) => {
    console.log(error);
  });

// routes
app.use("/api/documents/demo", documentRoutes); //when we fire a request to given route, use workoutRoutes
app.use("/api/members", MemberListRoutes);
app.use("/api/user", UserRoutes);
