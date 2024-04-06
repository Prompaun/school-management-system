const express = require('express');
const router = express.Router();
const app = express();
const cors = require("cors");

const session = require('express-session');
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");

require('dotenv').config();

module.exports = function() {

    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));
    // app.use(fileUpload());
    
    router.use(
        session({
        secret: process.env.GOOGLE_CLIENT_SECRET,
          resave: false,
          saveUninitialized: true,
        })
      );
    
    router.use(passport.initialize());
    router.use(passport.session());
    
    // router.use(
    //   cors({
    //     // origin: "http://localhost:5173",
    //     origin: process.env.CLIENT_URL,
    //     methods: "GET,POST,PUT,DELETE",
    //     credentials: true,
    //   })
    // );
    router.use(
      cors({
        origin: process.env.CLIENT_URL,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
        // allowedHeaders: "Content-Type,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Authorization",
        allowedHeaders: "Content-Type",
      })
    );
    

    router.use("/auth", authRoute);

    // app.use(function(req, res, next) {
    //   res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //   next();
    // });

    router.get('/auth/login/success', (req, res) => {
    // ตรวจสอบว่าผู้ใช้ล็อกอินเข้ามาด้วย Google OAuth หรือไม่
    if (req.user && req.user.email) {
        const userEmail = req.user.email; // ดึงอีเมล์ของผู้ใช้
        const userData = req.user; // เก็บข้อมูลผู้ใช้ทั้งหมดไว้ใน userData
        userData.email = userEmail; // เพิ่มข้อมูลอีเมล์ลงใน userData
        res.json({ user: userData }); // ส่งข้อมูลผู้ใช้ทั้งหมดกลับไปยัง React frontend
    } else {
        res.status(401).json({ error: "Authentication failed!" });
    }  
    });


    return router;
}