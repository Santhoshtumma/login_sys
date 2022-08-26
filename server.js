const express = require('express');
const path = require('path');
const app=express();
const bodyparser = require("body-parser");
const session = require("express-session");
const{v4:uuidv4}=require("uuid");

const router = require('./router');

const port=process.env.PORT||3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.set('view engine','ejs');

app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

app.use('/route',router);

app.get('/',(req,res)=>{ 
    if(req.session.user){
        res.redirect('/route/dashboard')
    }
    

    res.render('index',{ title:"Login System"});
})

app.listen(port,()=>{console.log("Lostening to the server on http://localhost:3000")});