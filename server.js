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
        p.category_id,
        p.product_name,
        p.size,
        p.sex,
        p.price,
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
  const { sort = 'asc', limit = 100 } = req.query; // default значения

  const sortOrder = sort.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
  const limitNumber = parseInt(limit, 10);

  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input('categoryName', sql.NVarChar, categoryName)
      .query(`
        SELECT TOP (${limitNumber})
          p.product_id,
          p.product_name,
               p.price,
               p.sex,
               c.category_name,
               p.image
        FROM Products p
               JOIN Category c ON p.category_id = c.category_id
        WHERE c.category_name = @categoryName
        ORDER BY p.price ${sortOrder}
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

app.post('/api/:type', async (req, res) => {
  const table = req.params.type;
  const data = req.body;

  try {
    let pool = await sql.connect(dbConfig);
    const keys = Object.keys(data);
    const values = keys.map(key => `'${data[key]}'`).join(', ');
    const columns = keys.join(', ');
    const query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
    await pool.request().query(query);
    res.status(200).json({ message: `Data inserted into ${table}` });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});

app.get('/api/:type/:id', async (req, res) => {
  const table = req.params.type;
  const id = req.params.id;
  const currentId = table.slice(0, -1) + '_id';
  console.log(currentId);
  const validTables = ['clients', 'products', 'suppliers', 'workers'];
  if (!validTables.includes(table)) {
    return res.status(400).json({ message: 'Invalid table name' });
  }

  try {
    let pool = await sql.connect(dbConfig);
    const query = `SELECT * FROM ${table} WHERE ${currentId} = ${id}`;
    console.log('Executing query:', query);
    const result = await pool.request().query(query);
    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]); // Возвращаем найденную запись
    } else {
      res.status(404).json({ message: `${table.slice(0, -1)} not found` }); // Если запись не найдена
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});


app.put('/api/:type/:id', async (req, res) => {
  const table = req.params.type;
  const id = req.params.id;
  const currentId = table.slice(0, -1) + '_id';
  const data = req.body;
  try {
    let pool = await sql.connect(dbConfig);
    const keys = Object.keys(data).filter(key => key !== currentId);
    console.log('keys ' + JSON.stringify(keys))
    const updates = keys.map(key => `${key} = '${data[key]}'`).join(', ');
    console.log('updates ' + updates)
    const query = `UPDATE ${table} SET ${updates} WHERE ${currentId} = ${id}`;
    console.log('Executing query:', query);
    await pool.request().query(query);
    res.status(200).json({ message: `Data updated in ${table}` });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});

app.delete('/api/:type/:id', async (req, res) => {
  const table = req.params.type;
  const id = req.params.id;
  const currentId = table.slice(0, -1) + '_id';
  const data = req.body;
  try {
    let pool = await sql.connect(dbConfig);
    const query = `DELETE from ${table} WHERE ${currentId} = ${id}`;
    console.log('Executing query:', query);
    await pool.request().query(query);
    res.status(200).json({ message: `Data delete in ${table}` });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
