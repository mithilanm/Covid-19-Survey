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

app.get('/company_choice', cors(), async (req, res, next) => {
  try {
    con.query('SELECT company_code, company_name, manager_login_id FROM login',  (err, rows) => {
      if (err) {
        console.log(err)
        return res.send(err);
      }

      else
      console.log(rows)
        return res.json( rows );

    });
  } catch (err) {
    next(err)
  }
});

app.get('/company', cors(), async (req, res, next) => {
  try {
    con.query('SELECT company_code, company_name, manager_login_id FROM login',  (err, rows) => {
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

app.get('/visitorGroupID', cors(), async (req, res, next) => {
  try {
    con.query('SELECT id as Id, company_code FROM tb_employees_group WHERE type=1 AND gmt_deleted IS NULL',  (err, rows) => {
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

app.post('/NewVisitors/:id/:creator_id/:company_code',(req,res) =>{
  const name=req.body.name;
  const sex=req.body.sex;
  const email=req.body.email;
  const work_phone=req.body.work_phone;
  const work_address=req.body.work_address;
  const company_code = req.params.company_code;
  const group_id=req.params.id;
  const id_card_no = req.body.id_card_no;
  const creator_login_id = req.params.creator_id;

  var sql2 = "INSERT INTO tb_employees_info (person_id,name,sex,group_id,email,phone_num, id_card_no, address,type,upload_time,creator_login_id,banci_id,device_group_ids,att_flag) VALUES (?,?,?,?,?,?,?,?,1,NOW(),?,0,?,0)"
  var sql3 = "INSERT INTO new_employee_info (id, company_code,yearOfBirth,province,city,postal_code,cell_phone,manager, manager_email, status,survey_req) VALUES (?,?,NULL,NULL,NULL,NULL,?,NULL,'',1,1)"

   con.query(sql2, [email, name, sex, group_id, email, work_phone, id_card_no, work_address, creator_login_id, null], (err, rows, fields) => {
    if (err) {
      return res.send(err);
    }
  });

  con.query(sql3, [ email, company_code,  work_phone],
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