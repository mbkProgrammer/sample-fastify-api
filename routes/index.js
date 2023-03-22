const { getAllPostsController, getSinglePostController, searchPostController } = require('../controllers/postsController');
const accessTokenController = require('../controllers/accessTokenController');
const signUpController = require('../controllers/signUpController');
const signUpSchema = require('../schemas/signupSchema');
const loginSchema = require('../schemas/loginSchema');
const forgotPassSchema = require('../schemas/forgotPassSchema');
const resetPassSchema = require('../schemas/resetPassSchema');
const loginController = require('../controllers/loginController');
const forgotController = require('../controllers/forgetController');
const resetPasswordController = require('../controllers/resetPasswordController');

const routes = async (fastify) => {
  // Declare a route
  fastify.get('/', async () => ('Welcome to sample api create with fastify and postgresql'));

  // route get all post
  fastify.get('/posts/getAllPosts/', getAllPostsController);

  // route get one post
  fastify.get('/posts/getSinglePost/:id', getSinglePostController);

  // route search posts
  fastify.get('/posts/searchPosts', searchPostController);

  // route for signUp user
  fastify.post('/users/signup', { schema: signUpSchema }, signUpController);

  // route for login user
  fastify.post('/users/login', { schema: loginSchema }, loginController);

  // route for protected
  fastify.get('/users/accessToken', accessTokenController);

  // route for forgot password
  fastify.post('/users/forget', { schema: forgotPassSchema }, forgotController);

  // route for reset password
  fastify.post('/users/reset', { schema: resetPassSchema }, resetPasswordController);
};

module.exports = routes;
