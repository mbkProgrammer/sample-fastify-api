const { Op } = require('sequelize');
const { Post, Category } = require('../models/Post');
const postImageDecoder = require('../utils/postImageDecode');

// get all post controller
const getAllPostsController = async (req, res) => {
  // console.log('req.querr', req.params);
  const { limit, page, sort } = req.query;
  const offset = (page - 1 || 0) * limit || 0;
  const order = sort ? [[sort, 'ASC']] : [['created_at', 'ASC']];
  const postCounts = await Post.count();

  const posts = await Post.findAll(
    limit
      ? {
        include: [Category],
        limit: +limit,
        offset,
        order,
      }
      : {
        order,
        include: [Category],
      },
  );

  res.send({
    post: postImageDecoder(posts),
    pageCounts: postCounts / limit || 1,
    activePage: page,
  });
};

const getPostByCategoryController = async (req, res) => {
  // console.log('req.querr', req.params);
  const {
    categoryName, limit, page, sort,
  } = req.query;
  const offset = (page - 1 || 0) * limit || 0;
  const order = sort ? [[sort, 'ASC']] : [['created_at', 'ASC']];
  const postCounts = await Post.count();

  const posts = await Post.findAll(
    limit
      ? {
        include: {
          model: Category,
          where: { name: categoryName },
        },
        limit: +limit,
        offset,
        order,
      }
      : {
        order,
        include: {
          model: Category,
          where: { name: categoryName || '' },
        },
      },
  );
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
  getPostByCategoryController,
};
