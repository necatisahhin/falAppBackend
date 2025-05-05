const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};


exports.register = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      password, 
      age, 
      gender, 
      maritalStatus,
      profileImage 
    } = req.body;

    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kullanılıyor.' });
    }

    
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      age,
      gender,
      maritalStatus,
      profileImage: profileImage || null
    });

    
    const token = generateToken(user.id);
    
    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
      maritalStatus: user.maritalStatus,
      profileImage: user.profileImage,
      token
    });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    
    const token = generateToken(user.id);

    
    res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
      maritalStatus: user.maritalStatus,
      profileImage: user.profileImage,
      token
    });
  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};


exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Profil getirme hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};


exports.updateUserProfile = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      password, 
      age, 
      gender, 
      maritalStatus, 
      profileImage 
    } = req.body;

    
    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    
    const updatedFields = {};
    
    if (firstName) updatedFields.firstName = firstName;
    if (lastName) updatedFields.lastName = lastName;
    if (password) updatedFields.password = password;
    if (age) updatedFields.age = age;
    if (gender) updatedFields.gender = gender;
    if (maritalStatus) updatedFields.maritalStatus = maritalStatus;
    if (profileImage !== undefined) updatedFields.profileImage = profileImage;

    
    await user.update(updatedFields);

    
    const updatedUser = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    res.status(200).json({
      success: true,
      message: 'Kullanıcı bilgileri başarıyla güncellendi.',
      data: updatedUser
    });
  } catch (error) {
    console.error('Profil güncelleme hatası:', error);
    res.status(500).json({ 
      success: false,
      message: 'Sunucu hatası', 
      error: error.message 
    });
  }
}; 