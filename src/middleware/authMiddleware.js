const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


exports.protect = async (req, res, next) => {
  let token;

  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  
  if (!token) {
    return res.status(401).json({ message: 'Erişim reddedildi. Giriş yapmanız gerekiyor.' });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(401).json({ message: 'Geçersiz token. Kullanıcı bulunamadı.' });
    }

    
    req.user = user;
    next();
  } catch (error) {
    console.error('Token doğrulama hatası:', error);
    return res.status(401).json({ message: 'Geçersiz token. Lütfen tekrar giriş yapın.' });
  }
}; 