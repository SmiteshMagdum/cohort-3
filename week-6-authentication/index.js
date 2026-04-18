const express = require("express");
const jwt=  require("jsonwebtoken")
const JWT_SECRET="randomkirat"

const app = express();

app.use(express.json());

let users = [];



app.post("/singup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

 
  users.push({
    username: username,
    password: password,
  });

  res.json({
    nessage: "YOU are signd in",
  });
  console.log(users);
  
});

app.post("/singin", function (req, res) {
     const username = req.body.username;
     const password = req.body.password;

     let foundUSer = null;
     for(let i = 0; i<users.length; i++){
        if(users[i].username == username && users[i].password == password){
            foundUSer = users[i]
        }
     }

     if(foundUSer){
        const token = jwt.sign({
            username: username
        }, JWT_SECRET)

        // foundUSer.token = token
        res.json({
            message: token
        })

        }else {
            res.status(403).send({
                message: "Invalid username or password"
            })
     }
     console.log(users);
     
});


app.get("/me", function(req, res) {
    const token = req.headers.token;

    try {
        const decodedInformation = jwt.verify(token, JWT_SECRET);

        const username = decodedInformation.username;

        let foundUser = null;

        for (let i = 0; i < users.length; i++) {
            if (users[i].username == username) {
                foundUser = users[i];
            }
        }

        if (foundUser) {
            res.json({
                username: foundUser.username,
                password: foundUser.password
            });
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }

    } catch (err) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
});

app.listen(3000);
