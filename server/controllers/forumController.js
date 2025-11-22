const ForumPost = require('../models/ForumPost');

// @desc    Get all forum posts
// @route   GET /api/forum
// @access  Public
exports.getPosts = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (category && category !== 'all') {
      query.category = category;
    }

    const posts = await ForumPost.find(query)
      .populate('user', 'name location')
      .populate('replies.user', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ForumPost.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        posts,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single post
// @route   GET /api/forum/:id
// @access  Public
exports.getPost = async (req, res, next) => {
  try {
    const post = await ForumPost.findById(req.params.id)
      .populate('user', 'name location')
      .populate('replies.user', 'name');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create forum post
// @route   POST /api/forum
// @access  Private
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, category, tags } = req.body;
    
    const post = await ForumPost.create({
      user: req.user.id,
      title,
      content,
      category,
      tags
    });

    await post.populate('user', 'name location');

    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update forum post
// @route   PUT /api/forum/:id
// @access  Private
exports.updatePost = async (req, res, next) => {
  try {
    const { title, content, category, tags } = req.body;
    
    let post = await ForumPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post'
      });
    }

    post = await ForumPost.findByIdAndUpdate(
      req.params.id,
      { title, content, category, tags },
      { new: true, runValidators: true }
    ).populate('user', 'name location');

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete forum post
// @route   DELETE /api/forum/:id
// @access  Private
exports.deletePost = async (req, res, next) => {
  try {
    const post = await ForumPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
    }

    await ForumPost.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add reply to post
// @route   POST /api/forum/:id/replies
// @access  Private
exports.addReply = async (req, res, next) => {
  try {
    const { content } = req.body;
    
    const post = await ForumPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    post.replies.push({
      user: req.user.id,
      content
    });

    await post.save();
    await post.populate('replies.user', 'name');

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Like/unlike post
// @route   PUT /api/forum/:id/like
// @access  Private
exports.likePost = async (req, res, next) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if the post has already been liked
    const alreadyLiked = post.likes.includes(req.user.id);

    if (alreadyLiked) {
      // Unlike the post
      post.likes = post.likes.filter(like => like.toString() !== req.user.id);
    } else {
      // Like the post
      post.likes.push(req.user.id);
    }

    await post.save();

    res.status(200).json({
      success: true,
      data: {
        likes: post.likes.length,
        liked: !alreadyLiked
      }
    });
  } catch (error) {
    next(error);
  }
};