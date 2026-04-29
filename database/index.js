const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { z } = require("zod");

mongoose.connect(
  "mongodb+srv://smiteshmagdum_db_user:xSvAVEQkZGx2HQsm@cohort-3.bunsd92.mongodb.net/todos-app-week-7-2",
);

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    name: z.string().min(3).max(100),
    password: z.string().min(3).max(30),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    return res.json({          
      message: "Incorrect format",
      errors: parsedDataWithSuccess.error.errors  
    });
  }

  const { email, password, name } = req.body;   
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    await UserModel.create({ email, password: hashedPassword, name });

    return res.json({ message: "You are signed up" });   
  } catch (e) {
    return res.json({ message: "User already exists" });  
  }
});

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const response = await UserModel.findOne({
    email: email,
  });
  if (!response) {
    res.statusMessage(403).json({
      message: "USer does not exist in our db",
    });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, response.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: response._id.toString(),
      },
      JWT_SECRET,
    );

    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect creds",
    });
  }
});

app.post("/todo", auth, async function (req, res) {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.done;

  await TodoModel.create({
    userId,
    title,
    done,
  });

  res.json({
    message: "Todo created",
  });
});

app.get("/todos", auth, async function (req, res) {
  const userId = req.userId;

  const todos = await TodoModel.find({
    userId,
  });

  res.json({
    todos,
  });
});

app.listen(3000);
