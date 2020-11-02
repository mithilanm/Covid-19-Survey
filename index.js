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
  const email = req.body.email;
  const time = req.body.time;
  con.query('INSERT into survey_answers (answer, question_id, email, time) VALUES (?, ?, ?, ?)', [answer, question_id, email, time],
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


app.post('/Survey_Results', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const email = req.body.email;
  const employee_name = req.body.employee_name;
  const date = req.body.date;
  const pass_type = req.body.pass_type;
  con.query('INSERT INTO survey_results (email, employee_name, date, pass_type) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE pass_type=?', [email, employee_name, date, pass_type, pass_type],
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

app.get('/visitorGroupID', cors(), async (req, res, next) => {
  try {
    con.query('SELECT id as Id FROM tb_employees_group WHERE type=1 AND gmt_deleted IS NULL',  (err, rows) => {
      if (err) {
        console.log(err)
        return res.send(err);
      }

      else
      console.log(rows)
        return res.json({ data: rows });

    });
  } catch (err) {
    next(err)
  }
});

app.post('/NewVisitors/:id',(req,res) =>{
  const name=req.body.name;
  const sex=req.body.sex;
  const email=req.body.email;
  const work_phone=req.body.work_phone;
  const work_address=req.body.work_address;
  const company_name = req.body.company_name;
  const group_id=req.params.id;

  var sql = "INSERT INTO tb_employees_info (name,sex,group_id,email,phone_num,address,type,upload_time,creator_login_id,banci_id,device_group_ids,att_flag) VALUES (?,?,?,?,?,?,1,NOW(),?,0,?,0)"
  var sql2 = "INSERT INTO employee_info (company_code,yearOfBirth,province,city,postal_code,cell_phone,manager,status,survey_req) VALUES (?,NULL,NULL,NULL,NULL,?,NULL,1,1)"

 //Ask danny about status number
 /*
  mips.query(sql, [name, sex, group_id, email, work_phone, RFID, work_address, req.session.managerLoginID, null], (err, rows, fields) => {
    if (err) {
      return res.send(err);
    }
  });

  mips.query(sql2, [ req.session.companyCode,  work_phone],
    (err, rows, fields) => {
      if (err) {
        console.log(err)
        return res.send(err);
      }
      else {
        res.send("Thanks!")
      }
    });
  */
   con.query(sql, [name, sex, group_id, email, work_phone, RFID, work_address, null, null], (err, rows, fields) => {
    if (err) {
      return res.send(err);
    }
  });

  con.query(sql2, [ null,  work_phone],
    (err, rows, fields) => {
      if (err) {
        console.log(err)
        return res.send(err);
      }
      else {
        res.send("Thanks!")
      }
    });
});



app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`);
});