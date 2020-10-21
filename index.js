const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());

//Connect to DB
const con = mysql.createConnection({
  //socketPath: '/var/lib/mysql/mysql.sock',
  hostname: "localhost",
  user: "root",
  password: "1234",
  database: "firstdash",
  //database: 'fsdev_FSFE'
});

con.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
  //console.log(con);
});

const sessionStore = new MySQLStore(
  {
    expiration: 1825 * 86400 * 1000,
    endConnectionOnClose: false,
  },
  con
);

app.use(
  session({
    key: "4289thgub4390ghejgbsdifhsd",
    secret: "mg3g48hddncnjnALKFJjdhfadfj",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1825 * 86400 * 1000,
      httpOnly: false,
    },
  })
);
// Serve static files from the React frontend app
app.use(
  express.static(path.join(__dirname, "client/build")),
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  }
);

// add middleware
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

//Survey on index
app.post('/Survey', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const answer = req.body.answer;
  const question_id = req.body.question_id;
  const employee_id = req.body.employee_id;
  con.query('INSERT into survey_answers (answer, question_id, employee_id) VALUES (?, ?, ?)', [answer, question_id, employee_id],
  (err, rows, fields) => {
    if(err) {
      console.log(err);
      return res.send(err);
    }
    else {
      res.send('Thanks!')
    }
  })
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`);
});