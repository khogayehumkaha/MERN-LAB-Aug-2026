// No Need OF Postgres Database
const jwt=require('jsonwebtoken');
const express=require('express');
const app=express();
const JWT_SECRET="anytexthere";

function authenticateHeader(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(!token){
        res.json({error:"Error generating token"});
    }
    jwt.verify(token,JWT_SECRET,(err,user)=>{
        if(err){
            res.json({error:"Error Verifying"});
        }
        req.user=user;
        next();
    })
}

app.get('/',(req,res)=>{
    res.send("Normal Home page");
})

app.get('/about',(req,res)=>{
    const uname='vaikunt';
    const token=jwt.sign({uname},JWT_SECRET,{expiresIn:'1hr'});
    res.json({token});
})

app.post('/login',authenticateHeader,(req,res)=>{
    res.send("Welcome to protected site");
})

app.listen(3000);