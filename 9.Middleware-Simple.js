
const fs=require('fs');
const express=require('express');
const app=express();
app.use(express.json());

app.use('/',(req,res,next)=>{
    const logEntry=`[${req.method}${req.url}]\n`
    console.log(logEntry.trim());
    fs.appendFileSync("requests.log",logEntry);
    next();
});

function middleware1(req,res,next){
    console.log("Middleware Cought");
    next();
}

app.get('/',middleware1,(req,res)=>{
    res.send("Middleware activated");
    
})

app.listen(3000);

/*

or if u need some log
server.listen(3000, () => {
    console.log("JSON server running at http://localhost:3000/");
});

in Postman first access  GET http://localhost:3000/
 you get in Postman  --> Middleware activated
 in terminal --> Middleware Cought

 next in Postman acess any Url say GET http://localhost:3000/Me
 everything will be stored in request.log file and every time it will be cought

*/