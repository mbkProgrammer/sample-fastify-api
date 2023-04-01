const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/db');
// const Category = require('./Category');

const Post = sequelize.define('Post', {
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
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'posts',
  timestamps: false,
});

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'categories',
});

Category.hasMany(Post, { foreignKey: 'category_id' });
Post.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = { Post, Category };
