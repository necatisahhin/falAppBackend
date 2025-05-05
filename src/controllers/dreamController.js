const Dream = require('../models/Dream');
const User = require('../models/User');


exports.saveDream = async (req, res) => {
  try {
    const { title, content, category, interpretation } = req.body;
    const userId = req.user.id;

    
    const dream = await Dream.create({
      userId,
      title,
      content,
      category,
      interpretation,
      isFavorite: false
    });

    res.status(201).json({
      success: true,
      data: dream
    });
  } catch (error) {
    console.error('Rüya kaydetme hatası:', error);
    res.status(500).json({ 
      success: false,
      message: 'Sunucu hatası', 
      error: error.message 
    });
  }
};


exports.getUserDreams = async (req, res) => {
  try {
    const userId = req.user.id;

    const dreams = await Dream.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: dreams.length,
      data: dreams
    });
  } catch (error) {
    console.error('Rüyaları getirme hatası:', error);
    res.status(500).json({ 
      success: false,
      message: 'Sunucu hatası', 
      error: error.message 
    });
  }
};


exports.getDream = async (req, res) => {
  try {
    const dreamId = req.params.id;
    const userId = req.user.id;

    const dream = await Dream.findOne({
      where: { 
        id: dreamId,
        userId 
      }
    });

    if (!dream) {
      return res.status(404).json({ 
        success: false,
        message: 'Rüya bulunamadı' 
      });
    }

    res.status(200).json({
      success: true,
      data: dream
    });
  } catch (error) {
    console.error('Rüya getirme hatası:', error);
    res.status(500).json({ 
      success: false,
      message: 'Sunucu hatası', 
      error: error.message 
    });
  }
};


exports.updateDream = async (req, res) => {
  try {
    const dreamId = req.params.id;
    const userId = req.user.id;
    const { title, content, category, interpretation, isFavorite } = req.body;

    
    let dream = await Dream.findOne({
      where: { 
        id: dreamId,
        userId 
      }
    });

    if (!dream) {
      return res.status(404).json({ 
        success: false,
        message: 'Rüya bulunamadı' 
      });
    }

    
    dream = await dream.update({
      title: title || dream.title,
      content: content || dream.content,
      category: category || dream.category,
      interpretation: interpretation || dream.interpretation,
      isFavorite: isFavorite !== undefined ? isFavorite : dream.isFavorite
    });

    res.status(200).json({
      success: true,
      data: dream
    });
  } catch (error) {
    console.error('Rüya güncelleme hatası:', error);
    res.status(500).json({ 
      success: false,
      message: 'Sunucu hatası', 
      error: error.message 
    });
  }
};


exports.deleteDream = async (req, res) => {
  try {
    const dreamId = req.params.id;
    const userId = req.user.id;

    
    const dream = await Dream.findOne({
      where: { 
        id: dreamId,
        userId 
      }
    });

    if (!dream) {
      return res.status(404).json({ 
        success: false,
        message: 'Rüya bulunamadı' 
      });
    }

    
    await dream.destroy();

    res.status(200).json({
      success: true,
      message: 'Rüya başarıyla silindi'
    });
  } catch (error) {
    console.error('Rüya silme hatası:', error);
    res.status(500).json({ 
      success: false,
      message: 'Sunucu hatası', 
      error: error.message 
    });
  }
}; 