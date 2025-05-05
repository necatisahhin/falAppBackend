const express = require('express');
const cors = require('cors');
const { sequelize, testConnection } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const dreamRoutes = require('./routes/dreamRoutes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/dreams', dreamRoutes);


app.get('/', (req, res) => {
  res.send('FallApp API çalışıyor!');
});


const startServer = async () => {
  try {
    
    await testConnection();
    
    
    await sequelize.sync({ alter: true });
    console.log('Veritabanı tabloları senkronize edildi.');
    
    
    app.listen(PORT, () => {
      console.log(`Sunucu http:
    });
  } catch (error) {
    console.error('Sunucu başlatma hatası:', error);
    process.exit(1);
  }
};

startServer(); 