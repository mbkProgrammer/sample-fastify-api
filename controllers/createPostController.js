const Post = require('../models/Post');

const createPostController = (req, res) => {
  Post.create({
    image: `${process.env.URL}/posts/${req.file.filename}`,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    category_id: req.body.category_id,
  });
  console.log('req.file', req.file);
  return {};
};

module.exports = createPostController;
