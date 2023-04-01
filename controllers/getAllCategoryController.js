const { Category } = require('../models/Post');

const getAllCategoryController = async (req, res) => {
  const posts = await Category.findAll();
  res.send({
    posts,
  });
};

module.exports = getAllCategoryController;
