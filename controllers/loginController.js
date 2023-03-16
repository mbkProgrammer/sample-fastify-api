const User = require('../models/User');
const throwError = require('../utils/errorHandler');

const loginController = async (request, reply) => {
  const { email, password } = request.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throwError(reply, 'INVALID_EMAIL', 'Invalid email.');
    return;
  }
  if (!await User.validPassword(password, user)) {
    throwError(reply, 'INVALID_PASSWORD', 'Invalid password.');
    return;
  }
  const token = await User.createToken(user);

  reply.header('accessToken', token);

  // eslint-disable-next-line consistent-return
  return {
    is_admin: user.is_admin,
    created_at: user.created_at,
    email: user.email,
    name: user.name,
    address: user.address,
  };
};

module.exports = loginController;
