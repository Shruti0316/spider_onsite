const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const ejs = require("ejs");
const db = require("../database");
var name="";

router.get("/", (req, res) => {
    res.redirect("/login");
});
router.get("/login", (req, res) => {
    res.render("login.ejs");
});
router.get("/signup", (req, res) => {
    res.render("signup.ejs");
});
router.get("/cred", (req, res) => {
    db.query("select * from "+this.name,(error,result) => {
        if(result){
            res.render("home.ejs",{username: this.name,r: result});
        }
        else{
            console.log(error);
        }
    })
});
router.get("/del/:web/:user",(req,res) => {
    db.query("DELETE FROM "+this.name+" WHERE website=? and username=?",[req.params.web,req.params.user],(error,result)=>{
        try {
            res.redirect("/cred");
        } catch (error) {
            console.log(error);
        }
    })
})

router.post("/signup",async (req,res) => {
    var uname = req.body.username;
    var email = req.body.email;
    var pwd = req.body.password;
    console.log(uname,email,pwd);
        try {
            const salt = await bcrypt.genSalt();
            const hashedPwd = await bcrypt.hash(req.body.password,salt);
            //console.log(salt,hashedPwd);
            db.query("Select * from user",(err)=>{
                if(err){
                    db.query("create table user(username varchar(50) not null,email varchar(50) not null,password varchar(150) not null)");
                    // console.log("Table created");
                }
            });
            db.query("INSERT INTO user (username,email,password) values(?,?,?)",[uname,email,hashedPwd],(err)=>{
                if(!err){
                    //console.log("data entered successfully");
                    db.query("CREATE TABLE "+uname+" (website varchar(50),username varchar(50),email varchar(50),password varchar(150) not null)")
                    res.redirect("/")
                }
                else if(err){
                    console.log(err);
                }
            })
            
        } catch (error) {
            console.log(error);
        }
})
router.post("/login",async (req,res) => {
    this.name = req.body.username;
    var pwd = req.body.password;
    //console.log(name,pwd);
    if(this.name=="" || pwd==""){
        res.send("Enter Credentials");
    }
    else{
        db.query("SELECT password FROM user WHERE username=?",[this.name],async (err,result)=>{
            try {
                var ismatch = await bcrypt.compare(pwd,result[0].password);
                // console.log("ismatch: ",ismatch);
                if(ismatch){
                    // console.log("logged in");
                    res.redirect("/cred");   
                }
                else{
                    res.send("INVALID CREDENTIALS");
                }
            } catch (err) {
            //console.log("login failed");
                res.send("User doesn't exist");
            }
        })
    }
})
router.post("/add",async(req,res) => {
    if(req.body.password == null || (req.body.username==null || req.body.email ==null)){
        res.send("Incomplete Credentials");
    }
    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(req.body.password,salt);
    db.query("INSERT INTO "+this.name+" (website,username,email,password) values(?,?,?,?)",[req.body.website,req.body.username,req.body.email,hashedPwd],(result,error)=>{
        try {
            // console.log("successfully added");
            res.redirect("/cred");
        } catch (error) {
            console.log(error);
        }
    })
})
//EXPORTING ROUTER
module.exports = router;