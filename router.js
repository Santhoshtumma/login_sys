var express = require("express");
var router = express.Router();

const credential={
    email:"sunny@gmail.com",
    password:"sunny990"
}

router.post('/login',(req,res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
       req.session.user = req.body.email;
       res.redirect('/route/dashboard');
       //res.end("Login Successfully....!");
    }else{
        res.end("Invalid Username")
    }
});

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.redirect('/')
    }
})

router.get('/logout',(req,res)=>{
     req.session.destroy(res.render('index',{title:"Express",logout:"logout Successfully...!"}))
})

module.exports=router;