const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.static('public'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Reading_app'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/', (req, res) => {
      res.render('top.ejs');
    }
  );


app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM books',
    (error, results) => {
      res.render('index.ejs', {books: results});
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new.ejs')
})

app.listen(3000);