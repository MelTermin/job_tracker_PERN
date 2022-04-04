const express=require("express");
const app=express();
const cors=require("cors");
const auth= require("./routes/auth")
const env=require('dotenv')
env.config();

app.use(express.json());
app.use(cors());

app.use("/api",auth)


app.listen(process.env.PORT,()=> {
  console.log(`the server is running on port` + process.env.PORT)
})