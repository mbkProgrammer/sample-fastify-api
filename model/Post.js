const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../configs/db');

const Post = db.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(63),
  },
  content: {
    type: DataTypes.TEXT,
  },
  category_id: {
    type: DataTypes.INTEGER,
  },
  image: {
    type: DataTypes.BLOB('long'),
  },
  author: {
    type: DataTypes.STRING(63),
  },
  created_at: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'posts',
  timestamps: false,
});

module.exports = Post;
