const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin",
    "http://localhost:4200");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const dbConfig = {
  server: 'localhost', // или 127.0.0.1
  port: 1433,
  user: 'vika',
  password: '1234',
  database: 'bd_kursach',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

app.get('/api/products', async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query(`
      SELECT
        p.product_id,
        p.product_name,
        p.price,
        c.category_name,
        p.image
      FROM Products p
      JOIN Category c ON p.category_id = c.category_id
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error connecting to the database:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});


app.get('/api/products/categories', async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool
      .request()
      .query('SELECT DISTINCT c.category_name FROM Products p JOIN Category c ON p.category_id = c.category_id');
    res.json(result.recordset.map(row => row.category_name));
  } catch (err) {
    console.error('Error connecting to the database:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});

app.get('/api/products/category/:categoryName', async (req, res) => {
  const { categoryName } = req.params;
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input('categoryName', sql.NVarChar, categoryName)
      .query(`
        SELECT
          p.product_id,
          p.product_name,
          p.price,
          c.category_name,
          p.image
        FROM Products p
        JOIN Category c ON p.category_id = c.category_id
        WHERE c.category_name = @categoryName
      `);

    res.json(result.recordset);
  } catch (err) {
    console.error('Error when receiving products by category:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});

app.post('/signupUsersList', async (req, res) => {
  const { name, birthday, number, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input('name', sql.VarChar, name)
      .input('birthday', sql.Date, birthday)
      .input('number', sql.VarChar, number)
      .input('email', sql.NChar, email)
      .input('password', sql.VarChar, password)
      .query('INSERT INTO Clients (name, birthday, number, email, password) VALUES (@name, @birthday, @number, @email, @password)');
    res.status(200).json({ message: 'User created' });
    //res.status(200).send('Пользователь успешно зарегистрирован');
  } catch (err) {
    console.error('Error during user registration:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});

app.get('/api/signupUsersList', async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query('SELECT email, password FROM Clients');
    res.json(result.recordset.map(user => user.email));
  } catch (err) {
    console.error('Error receiving users:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});

app.use(express.json());
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input('email', sql.NChar, email)
      .input('password', sql.VarChar, password)
      .query('SELECT * FROM Clients WHERE email = @email AND password = @password');

    if (result.recordset.length > 0) {
      res.status(200).json({ message: 'Login successful', user: result.recordset[0] });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error when logging in:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});

app.get('/api/:type', async (req, res) => {
  const table = req.params.type;
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query(`SELECT * FROM ${table}`);
    res.json(result.recordset);
  } catch (err) {
    console.error('Request error:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
