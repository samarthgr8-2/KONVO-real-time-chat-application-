import express from "express"; //to build server and use api
import dotenv from "dotenv";//SENSITIVE INFORMATION LIKE PORT NO. OR DB URL SHOULD BE STORED IN .env FILE AND NOT IN CODE

import cors from "cors";//to allow cross origin requests from frontend to backend
import path from "path";
import authRoutes from "./routes/auth.route.js";//importing auth routes from auth.route.js file
import userRoutes from "./routes/user.route.js";//importing auth routes from auth.route.js file
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./lib/database.js";

import cookieParser from "cookie-parser";



dotenv.config(); //to use env variables from .env file

const app=express(); //making an express app we can use app instead of express everywhere
const PORT=process.env.PORT;//GETTING PORT NO. FROM .env FILE

const __dirname = path.resolve();


// app.get("/",(req,res)=>{
//   //route is initialized here
//   res.send("Samarth Gupta"); //on http://localhost:5001/
// });



//instead of writing routes in this file we make a separate file for routes and import it here

// //SIGNUP PAGE ROUTE
// app.get("/api/auth/signup",(req,res)=>{
//     res.send("SIGNUP ROUTE")
// });


// //LOGIN PAGE ROUTE
// app.get("/api/auth/login",(req,res)=>{
//     res.send("LOGIN ROUTE")
// });


// //LOGOUT PAGE ROUTE
// app.get("/api/auth/logout",(req,res)=>{
//     res.send("LOGOUT ROUTE")
// });


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true, //allow cookies to be sent from frontend to backend
}))
app.use(express.json());//If a client sends data in JSON format (usually in a POST or PUT request), this line makes sure you can access that data in: req.body
app.use(cookieParser());

//importing auth routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/chat",chatRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));//under frontend under dist in index.html
  // });

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });//from gpt
}




app.listen(PORT,()=>{
    //listen function calls the server and tells the answer from that port no.
    //callback
    console.log(`Server is running on Port no.->${PORT}`);//on terminal
    connectDB();
});


//we are generating a random avatar using the dicebear api https://api.dicebear.com/9.x/bottts/svg?seed=RANDOM-NUMBER