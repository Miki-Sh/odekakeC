const express = require('express');
const { Pool } = require('pg');
require('dotenv').config()

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

// EJSをテンプレートエンジンとして設定
app.set('view engine', 'ejs');
const path = require('path');
// viewsフォルダのパスを指定
app.set('views', path.join(__dirname, 'views'));

const pool = new Pool({
  connectionString: process.env.CONNECTION_URL,
})

pool.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/index', (req, res) => {
  pool.query(
    'SELECT * FROM toDo',
    (error, results) => {
      res.render('index.ejs',
      {toDo: results.rows}
      );
    }
  );
});

// 新規追加画面を表示する
app.get('/new', (req, res) => {
  res.render('new.ejs')  
});

// 追加処理を行う
app.post('/create', (req, res) => {
  pool.query(
    'INSERT INTO toDo (todolist) VALUES ($1)',
    [req.body.itemName],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

// 削除を行う
app.post('/delete/:id', (req, res) => {
  pool.query(
    'DELETE FROM toDo WHERE id = $1',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});
  
// 編集画面を表示する
app.get('/edit/:id', (req, res) => {
  pool.query(
    'SELECT * FROM toDo WHERE id = $1',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {item: results.rows[0]});
    }
  );
});

// メモを更新するルーティング
app.post('/update/:id', (req, res) => {
  pool.query(
    'UPDATE toDo SET todolist = $1 WHERE id = $2',
    [req.body.itemName, req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.listen(3000);