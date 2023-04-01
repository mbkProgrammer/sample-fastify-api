const {
  getAllPostsController, getSinglePostController, searchPostController, getPostByCategoryController,
} = require('../controllers/postsController');
const accessTokenController = require('../controllers/accessTokenController');
const signUpController = require('../controllers/signUpController');
const signUpSchema = require('../schemas/signupSchema');
const loginSchema = require('../schemas/loginSchema');
const forgotPassSchema = require('../schemas/forgotPassSchema');
const resetPassSchema = require('../schemas/resetPassSchema');
const loginController = require('../controllers/loginController');
const forgotController = require('../controllers/forgetController');
const resetPasswordController = require('../controllers/resetPasswordController');
const createPostController = require('../controllers/createPostController');
const upload = require('../middleware/upload');
const resizeImage = require('../middleware/resizeImage');
const getAllCategoryController = require('../controllers/getAllCategoryController');

const routes = async (fastify) => {
  // Declare a route
  fastify.get('/', async () => ('Welcome to sample api create with fastify and postgresql'));

  // route get all post
  fastify.get('/posts/getAllPosts/', getAllPostsController);

  // route get Post by category
  fastify.get('/posts/getPostByCategory/', getPostByCategoryController);

  // route get one post
  fastify.get('/posts/getSinglePost/:id', getSinglePostController);

  // route search posts
  fastify.get('/posts/searchPosts', searchPostController);

  // route for create Post
  fastify.post('/posts/create', { preHandler: [upload.single('image'), resizeImage] }, createPostController);

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

  // route for get all category
  fastify.get('/category/getAllCategory', getAllCategoryController);
};

module.exports = routes;
