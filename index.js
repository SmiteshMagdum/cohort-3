const express = require("express");
const app = express();



app.get("/add", function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  const sum = a + b;

  res.send({
    result: sum
  });
});
app.get("/divide", function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  const divide = a / b;

  res.send({
    result: divide
  });
});
app.get("/multiply", function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  const multiply = a * b;

  res.send({
    result: multiply
  });
});
app.get("/sub", function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  const subtract = a - b;

  res.send({
    result: subtract
  });
});




app.listen(3000);
   