const data = require('../posts.json');
const Post = require('../models/Post');

const importToDatabase = () => {
  data.forEach((post) => {
    Post.create({
      ...post,
      created_at: new Date(post.created_at).getTime(),
      tech_id: post.category_id,
    });
  });
};

importToDatabase();
