import express from "express";
import bodyParser from "body-parser";
import mysql2  from "mysql2";

const app=express();
const port=3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('static'));

const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todoapp'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});


app.get("/",(req,res)=>{
    connection.query('select * from todos', (err, rows) => {
        res.render("home.ejs",{data:rows});
    });
    
})

app.post("/login_submit",(req,res)=>{
    var data=req.body;
    console.log(data)
    connection.query('insert into todos (task,completed) values (?, 0) ', [data.new_todo], (err, rows) => {
        if (err) throw err;
        res.redirect('/');
    });
    
})

app.listen(port,()=>{
    console.log("running...");
})