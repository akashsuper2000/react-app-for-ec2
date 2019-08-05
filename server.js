const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

var con = mysql.createConnection({
  host: "database-1.cs3qjthqb1zr.us-east-1.rds.amazonaws.com", // ip address of$
  user: "admin", // user name to your mysql database
  password: "akash2000", // corresponding password
  database: "form" // use the specified database
});

con.connect((err) => {
  if(!err)  
  console.log('Connection succeeded.');
  else
  console.log('Unsuccessful \n Error : '+JSON.stringify(err,undefined,2));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api', (req, res) => {
   res.writeHead(200, { "Content-Type": "text/html" });
    
    var date = new Date(req.body.date);
    var today = new Date(); 
    var days = req.body.days;
    var country=req.body.country;
    var states=req.body.states;
  
   console.log(days);
   console.log(date);
   console.log(country);
   console.log(states);

    if(date<=today){
      res.write("Enter a date after today");
      console.log("Enter a date after today");
    }
    else if(days>30 || days<=0)
      {
        res.write("Days must be less than 30 and above 0!");
        console.log("Days must be less than 30");
        res.write("Submission Unsuccessful!");
      }
      else if (country ==="")
      { 
        res.write("Select a country!");
        console.log("Select a country!");
        res.write("Submission Unsuccessful!");
      }
      else if(states ==="")
      {
        res.write("Select a state!");
        console.log("Select a state!");
        res.write("Submission Unsuccessful!");
      }
    else {
      console.log(days + " " + date+ " " + country+ " " + states+ " Submitted Succesfully!");
      res.write("Submitted Succesfully!");
    con.query('insert into details (date, days, country, states) values (?,?,?,?)',[date,days,country,states]);
    }
    res.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`));