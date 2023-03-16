const User = require('../models/User');
const signUpSchema = require('../schemas/signupSchema');
const throwError = require('../utils/errorHandler');

const signUpController = async (req, res) => {
  const { email, name, password } = req.body;

  const userExistance = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (userExistance) {
    throwError(res, 'SIGN_UP', 'This user already exist!');
    return;
  }

  const user = await User.create({
    email,
    name,
    password: await User.encryptPassword(password),
  });
  const token = await User.createToken(user);

  res.header('accessToken', token);

  // eslint-disable-next-line consistent-return
  return {
    is_admin: user.is_admin,
    created_at: user.created_at,
    email: user.email,
    name: user.name,
    address: user.address,
  };
};

module.exports = signUpController;
