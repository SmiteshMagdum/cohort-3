const express = require("express");
const app = express();



app.get("/add/:a/:b", function (req, res) {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  const sum = a + b;

  res.send({
    result: sum
  });
});
app.get("/divide/:a/:b", function (req, res) {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  const divide = a / b;

  res.send({
    result: divide
  });
});
app.get("/multiply", function (req, res) {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  const multiply = a * b;

  res.send({
    result: multiply
  });
});
app.get("/sub", function (req, res) {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  const subtract = a - b;

  res.send({
    result: subtract
  });
});




app.listen(3000);
   