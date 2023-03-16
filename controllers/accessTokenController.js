/* eslint-disable consistent-return */
const createError = require('@fastify/error');
const User = require('../models/User');
const throwError = require('../utils/errorHandler');

const accessTokenController = async (request, reply) => {
  // Validate access token and get user info
  const user = await User.validateAccessToken(request.headers.accesstoken);
  if (!user) {
    throwError(reply, 'Access Token', 'Invalid Access Token');
    return;
  }
  return {
    is_admin: user.dataValues.is_admin,
    created_at: user.dataValues.created_at,
    email: user.dataValues.email,
    name: user.dataValues.name,
    address: user.dataValues.address,
  };
};

module.exports = accessTokenController;
