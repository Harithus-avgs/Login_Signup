const express = require("express");
const jwt = require("jsonwebtoken");
const jwtpassword = "123456";
const app = express();

app.use(express.json());

const ALL_USERS = [
  {
    email: "hariavgs@gmail.com",
    password: "12345678",
    name: "Harithus Avgs",
  },
  {
    email: "hariavgs1@gmail.com",
    password: "123456789",
    name: "Harithus Avgs 1",
  },
  {
    email: "hariavgs2@gmail.com",
    password: "12345678910",
    name: "Harithus Avgs 2",
  },
];

function userExists(email, password) {
  let userExists = false;

  for (i = 0; i < ALL_USERS.length; i++) {
    if (ALL_USERS[i].email == email && ALL_USERS[i].password == password) {
      userExists = true;
    }
  }

  return userExists;
}

app.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!userExists(email, password)) {
    return res.status(403).json({
      msg: "user doesnot exist",
    });
  }

  var token = jwt.sign({ email: email }, jwtpassword);
  return res.json({
    token,
  });
});

app.get("/users", (req, res) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtpassword);
    const email = decoded.email;
    res.json({
      users: ALL_USERS.filter(function (value) {
        if (value.email == email) {
          return false;
        } else {
          return true;
        }
      }),
    });
  } catch (err) {
    return res.status(403).json({
      msg: "invalid token", 
    });
  }
});

app.listen(3000);
