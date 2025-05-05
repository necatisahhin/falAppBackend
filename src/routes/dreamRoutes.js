const express = require('express');
const router = express.Router();
const dreamController = require('../controllers/dreamController');
const { protect } = require('../middleware/authMiddleware');


router.use(protect);


router.route('/')
  .post(dreamController.saveDream)
  .get(dreamController.getUserDreams);


router.route('/:id')
  .get(dreamController.getDream)
  .put(dreamController.updateDream)
  .delete(dreamController.deleteDream);

module.exports = router; 