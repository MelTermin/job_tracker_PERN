const express = require("express");
const router = express.Router();
const pool= require("../database")
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/checkAuth");

router.post("/register",async (req,res)=> {
  try {
    const {first_name,last_name,email,password}=req.body

    if(!(first_name,last_name,email,password)) {
      res.status(400).send("All inputs are required")
    }

    const oldUser= await pool.query ("select * from users where user_email=$1",[email])

    if(oldUser.rows.length !==0) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const salt=await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser= await pool.query("INSERT INTO users (user_name, user_lastname, user_email, password) VALUES ($1, $2, $3, $4) RETURNING *", [first_name,last_name,email,bcryptPassword])
  

    return res.status(201).json({
      user:newUser.rows[0],
      message:"The registration was successfull redirecting to the dashboard"
    })

  }catch(error) {
    console.log(error)
  }
})

router.post("/login", async(req,res)=> {
  try {
    const {email,password}=req.body

    if(!(email,password)) {
      res.status(400).send("All inputs are required")
    }
    const user=await pool.query ("SELECT * FROM users WHERE user_email =$1",[email]);

    req.user=user.rows[0];
    
    payload={
      id:user.rows[0].user_id,
      name:user.rows[0].user_name
    }
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "7d",
    });
    
    return res.status(200)
    .json({
    token:token,
    success: true,
    message: 'Logged in succefully',
  })
  }catch(error) {
    console.log(error)
  }
})

router.post("/protected", auth, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports=router;