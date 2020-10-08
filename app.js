const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

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

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO books (name,memo) VALUES (?,?)',
    [req.body.bookName,req.body.bookMemo],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM books WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM books WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {book: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  connection.query(
  'UPDATE books SET name = ? WHERE id = ?',
  [req.body.bookName, req.params.id],
  (error, results) => {
    connection.query(
      'UPDATE books SET memo = ? WHERE id = ?',
      [req.body.bookMemo, req.params.id],
      (error, results) => {
        res.redirect('/index');
      }
    );
    
  }
 ); 
});

app.listen(3000);