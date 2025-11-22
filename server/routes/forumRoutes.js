const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addReply,
  likePost
} = require('../controllers/forumController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/replies', protect, addReply);
router.put('/:id/like', protect, likePost);

module.exports = router;