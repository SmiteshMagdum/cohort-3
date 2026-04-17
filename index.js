const express = require("express");

const app = express();
let requestCounter = 0
function middleWare(req, res, next){
  requestCounter = requestCounter + 1 
  console.log(`request Count is ${requestCounter}`);
  
   next()
   
}

app.use(middleWare)

app.get("/sum", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
 
    res.json({
        ans: a + b
    })
    
});

app.get("/multiply", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a * b
    })
});

app.get("/divide", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a / b
    })

});

app.get("/subtract", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a - b
    })
});

app.listen(3000);