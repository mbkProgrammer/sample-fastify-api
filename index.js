// Require the framework and instantiate it
const Post = require('./model/Post');
const fastify = require('fastify')({ logger: true });

// Declare a route
fastify.get('/', async (request, reply) => ('Welcome to sample api create with fastify and postgresql'));

// route get all post
fastify.get('/posts/getAllPosts', async (req, res) => {
  const posts = await Post.findAll();
  const postArray = posts.map((post) => {
    const decodedImage = post.dataValues.image.toString('utf-8');
    return {
      id: post.dataValues.id,
      title: post.dataValues.title,
      content: post.dataValues.content,
      category_id: post.dataValues.category_id,
      author: post.dataValues.author,
      created_at: post.dataValues.created_at,
      image: decodedImage,
    };
  });

  res.send(postArray);
});

// route get one post

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
