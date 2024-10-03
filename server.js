const express = require('express');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const sequelize = require('./config/database');
const path = require('path');


const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


sequelize.sync()
  .then(() => {
    console.log('Подключение к базе данных прошло успешно');
    app.listen(5000, () => {
      console.log('Сервер запущен на порту 5000');
    });
  })
  .catch(err => console.log('Ошибка подключения к базе данных', err));
