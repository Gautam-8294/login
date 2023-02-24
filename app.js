const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

let allUser = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/signUp", {useNewUrlParser: true});
mongoose.set('strictQuery', false);





const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);


app.get("/",(req,res)=>{
    res.render("signUp");
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/success",(req,res)=>{
    res.render("success");
});

app.get("/account",(req,res)=>{
    res.render("account");
});

app.post("/",(req,res)=>{
    const user = new User({
        name: req.body.userName,
        email: req.body.userEmail,
        password: req.body.userPassword
    });
    allUser.push(user);
    user.save();
    res.redirect("/success");
    
});



app.post("/login",(req,res)=>{
    const loginUserEmail = req.body.loginUserEmail;
    const loginPassword = req.body.loginPassword;
    
    User.findOne({email: loginUserEmail, password: loginPassword}, function(obj,result) { 
        if(result){
            res.render("account", {userName: result.name, userEmail: result.email});
        }else{
            res.send("Create Account");
        }
     })
});













app.listen(3000, () => {
    console.log("server started on port 3000")
});