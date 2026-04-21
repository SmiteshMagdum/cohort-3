const jwt = require("jsonwebtoken")


 const value = {
    name: "smitesh",
    acountNumber : 12346
 }

 const token = jwt.sign(value,"secret")


// console.log(token);
 const verifyToken = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic21pdGVzaCIsImFjb3VudE51bWJlciI6MTIzNDYsImlhdCI6MTc3Njc1MTYyOH0.SlJbm4YPQeSGw8obIwv3exSqmUzDPR0b-aVbKns2Mpc","secret")

 console.log(verifyToken);
 