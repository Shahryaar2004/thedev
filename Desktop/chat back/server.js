// const express = require('express');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require("jsonwebtoken");
// const User = require("./schema");
// const connectDB = require("./config");
// const sendMail = require('./mailsend')
// const { getEmailTemplate, generateOTP } = require("./resetmail");

// const jwtkey = 'zapzo';
// const Refreshtokenkey = "zapzprefresh"
// const app = express();
// const port = 5000;


// app.use(express.json());
// app.use(cors({
//   origin: ["http://localhost:5173"],
//   credentials: true
// }));


// connectDB();



// // Register API
// let refreshTokens = [];
//  //nigga enters
// app.post('/register', async (req, res) => {
//   try {
//     const { email, password, username } = req.body;

//     const existingUser = await User.findOne({ $or: [{ email }, { username }] });

//     if (existingUser) {
//       if (existingUser.email === email) {
//         return res.status(409).json({ success: false, message: "Email is already registered." });
//       }
//       if (existingUser.username === username) {
//         return res.status(409).json({ success: false, message: "Username is already taken." });
//       }
//     }


//     const saltRounds = 12;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);


//     const newUser = new User({ email, username, password: hashedPassword });
//     const result = await newUser.save();

   
//     const accessToken = jwt.sign({ id: result._id }, jwtkey, { expiresIn: "15m" });
//     const refreshToken = jwt.sign({ id: result._id }, Refreshtokenkey, { expiresIn: "7d" });

  
//     refreshTokens.push(refreshToken);

    
//     res.status(201).json({ 
//       success: true, 
//       user: result, 
//       accessToken, 
//       refreshToken 
//     });

//   } catch (err) {
//     console.error("Error during registration:", err);
//     res.status(500).json({ success: false, message: "Server error. Please try again later." });
//   }
// });

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {

//     const user = await User.findOne({ email: email.toLowerCase() });

//     if (!user) {
//       return res.status(401).json({ success: false, message: "User not found" });
//     }

 
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: "Invalid credentials" });
//     }

  
//     const accessToken = jwt.sign({ id: user._id }, jwtkey, { expiresIn: "15m" });
//     const refreshToken = jwt.sign({ id: user._id }, Refreshtokenkey, { expiresIn: "7d" });

//     refreshTokens.push(refreshToken); 

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       user: { id: user._id, email: user.email, username: user.username },
//       accessToken,
//       refreshToken
//     });

//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ success: false, message: "Server error. Please try again later." });
//   }
// });


// app.post("/token", (req, res) => {
//   const { token } = req.body;
//   if (!token) return res.sendStatus(401);
//   if (!refreshTokens.includes(token)) return res.sendStatus(403);

//   jwt.verify(token, REFRESH_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);

//     const accessToken = generateAccessToken({ id: user.id, username: user.username });
//     res.json({ accessToken });
//   });
// });

// var bodyParser = require('body-parser');
// app.use(bodyParser.json());

// app.put("/resetPass", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const otp = generateOTP();

//     const user = await User.findOneAndUpdate(
//       { email },
//       { otp, otpExpiry: new Date(Date.now() + 1 * 60 * 1000) },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ success: false, message: "nigga not found" });
//     }

//     await sendMail({
//       to: email,
//       subject: "Password Reset Request",
//       html: getEmailTemplate(otp),
//     });

    
//     setTimeout(async () => {
//       await User.updateOne(
//         { email, otp },
//         { $set: { otp: null, otpExpiry: null } }
//       );
//     }, 60 * 1000);

//     res.json({ success: true, message: "Reset email sent" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Failed to send mail nigger" });
//   }
// });




// app.post("/verifyupdate", async (req, res) => {
//   const { email, password, otp } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ success: false, message: "nigga not found" });
//     }

   
//     if (user.otpExpiry && user.otpExpiry < new Date()) {
//       user.otp = null;
//       user.otpExpiry = null;
//       await user.save();
//       return res
//         .status(400)
//         .json({ success: false, message: " niga black OTP has expired" });
//     }

   
//     if (user.otp !== otp) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid OTP" });
//     }

   
//     const saltRounds = 12;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     user.password = hashedPassword;
//     user.otp = null;
//     user.otpExpiry = null;
//     await user.save();

//     res.json({ success: true, message: "Password updated successfully" });
//   } catch (err) {
//     console.error("Error in verifyupdate:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import User from "./schema.js";
import connectDB from "./config.js";
import sendMail from "./mailsend.js";
import { getEmailTemplate, generateOTP } from "./resetmail.js";

const jwtkey = "zapzo";
const Refreshtokenkey = "zapzprefresh";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
app.use(bodyParser.json());

// Connect DB
connectDB();

// Create server and Socket.IO
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket.IO events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Send updated user list
  io.emit("allUsers", [...io.sockets.sockets.keys()]);

  // Join room
  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);
  });

  // Send message inside the room
  socket.on("message", ({ room, message }) => {
    io.to(room).emit("recieve-message", `${socket.id}: ${message}`);
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    io.emit("allUsers", [...io.sockets.sockets.keys()]);
  });
});

// ================== AUTH APIs ==================
let refreshTokens = [];

// Register
app.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({ success: false, message: "Email is already registered." });
      }
      if (existingUser.username === username) {
        return res.status(409).json({ success: false, message: "Username is already taken." });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, username, password: hashedPassword });
    const result = await newUser.save();

    const accessToken = jwt.sign({ id: result._id }, jwtkey, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: result._id }, Refreshtokenkey, { expiresIn: "7d" });

    refreshTokens.push(refreshToken);

    res.status(201).json({ success: true, user: result, accessToken, refreshToken });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


app.post('/login', async (req, res) => {
  const { email, password, } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ success: false, message: "User not found" });
    if(user.loggedin == true) return res.status(401).json({ success: false, message: "user already logged in" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });
   user.loggedin = true;
    await user.save();
    const accessToken = jwt.sign({ id: user._id }, jwtkey, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user._id }, Refreshtokenkey, { expiresIn: "7d" });

    refreshTokens.push(refreshToken);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user._id, email: user.email, username: user.username },
      accessToken,
      refreshToken
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
app.post('/logout', async function (req, res) {
  const {userId} = req.body;
  try{
    const user = await User.findById(userId)
    if(!user) return res.status(401),res.json({success:false , message : "user not found"})
    
    user.loggedin =false
    await user.save()

    return res.status(200).json({success:true , message : "log out successfull"} )

  } catch(err){
    console.log(err)
  }
})
app.post("/token", (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);
  if (!refreshTokens.includes(token)) return res.sendStatus(403);

  jwt.verify(token, Refreshtokenkey, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign({ id: user.id }, jwtkey, { expiresIn: "15m" });
    res.json({ accessToken });
  });
});

app.put("/resetPass", async (req, res) => {
  const { email } = req.body;
  try {
    const otp = generateOTP();
    const user = await User.findOneAndUpdate(
      { email },
      { otp, otpExpiry: new Date(Date.now() + 1 * 60 * 1000) },
      { new: true }
    );
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    await sendMail({ to: email, subject: "Password Reset Request", html: getEmailTemplate(otp) });

    setTimeout(async () => {
      await User.updateOne({ email, otp }, { $set: { otp: null, otpExpiry: null } });
    }, 60 * 1000);

    res.json({ success: true, message: "Reset email sent" });
  } catch (err) {
    console.error("Error in resetPass:", err);
    res.status(500).json({ success: false, message: "Failed to send mail" });
  }
});

app.post("/verifyupdate", async (req, res) => {
  const { email, password, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.otpExpiry && user.otpExpiry < new Date()) {
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
      return res.status(400).json({ success: false, message: "OTP has expired" });
    }

    if (user.otp !== otp) return res.status(400).json({ success: false, message: "Invalid OTP" });

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Error in verifyupdate:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

server.listen(port, () => {
  console.log(`Server running with API + Socket.IO on http://localhost:${port}`);
});
