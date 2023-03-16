const { Op } = require('sequelize');
const Post = require('../models/Post');
const postImageDecoder = require('../utils/postImageDecode');

// get all post controller
const getAllPostsController = async (req, res) => {
  // console.log('req.querr', req.params);
  const { limit, page, sort } = req.query;
  const offset = (page - 1 || 0) * limit || 0;
  const order = sort ? [[sort, 'ASC']] : [['created_at', 'ASC']];
  const postCounts = await Post.count();
  const posts = await Post.findAll(limit ? {
    limit: +limit,
    offset,
    order,
  } : { order });
  res.send({
    post: postImageDecoder(posts),
    pageCounts: postCounts / limit || 1,
    activePage: page,
  });
};

// get single post controller
const getSinglePostController = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  const decodedImage = post.dataValues.image.toString('utf-8');
  return {
    ...post.dataValues,
    image: decodedImage,
  };
};

const searchPostController = async (req, res) => {
  const { q } = req.query;
  const posts = await Post.findAll({
    where: {
      title: { [Op.iLike]: `%${q}%` },
    },
  });
  return postImageDecoder(posts);
};

module.exports = {
  getAllPostsController,
  getSinglePostController,
  searchPostController,
};
