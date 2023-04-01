const data = require('../category.json');
const Category = require('../models/Category');
const Post = require('../models/Post');

const importToDatabase = () => {
  data.forEach((post) => {
    Category.create({
      name: post.name,
    });
  });
};

importToDatabase();
