const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { urlencoded } = require('express');
const app = express();

app.use(express.json());

app.use(express.urlencoded());
app.use(cors());

mongoose.connect("mongodb+srv://ishaan:ishaan007@cluster1.wumfpap.mongodb.net/login-register?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=>{
    console.log("MongoDB connected")
})

//schema
const userSchema = mongoose.Schema({
    name : {
        type:String
    },
    email : {
        type: String
    },
    password: {
        type:String
    }
})

const User =  mongoose.model("User",userSchema)
//routes
app.post('/login',(req,res)=>{
    const {email, password} = req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            if(password == user.password){
                res.send({ message: "Login Successfull", user: user });
            }else{
                res.send({ message: "Password didn't match" });
            }
        }else{
             res.send({message: "User not registered"})
        }
    })
})

app.post("/register", (req, res) => {
    const {name, email, password} = req.body;
    console.log(req.body)
    User.findOne({email:email},(err,user)=>{
         if (user) {
           res.send({ message: "User already registerd" });
         } else {
           const user = new User({
             name,
             email,
             password,
           });
           user.save((err) => {
             if (err) {
               res.send(err);
             } else {
               res.send({
                 message: "Successfully Registered, Please login now.",
               });
             }
           });
         }
    })
});

app.listen(4000,()=>{
    console.log("Server is started");
})