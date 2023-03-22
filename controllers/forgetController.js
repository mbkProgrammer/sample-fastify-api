const User = require('../models/User');
const resetPassword = require('../template/resetPasswordTemplate');
const throwError = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail');

const forgotController = async (req, res) => {
  const { email } = req.body;

  const userExistance = await User.findOne({
    where: {
      email,
    },
  });

  if (!userExistance) {
    throwError(res, 'SIGN_UP', 'This email has not logged in.');
    return;
  }

  const { id, name } = userExistance.dataValues;

  const token = await User.createForgotToken({ userId: id, email });
  await User.update({
    forgot_token: token,
  }, { where: { email } });

  await sendEmail({
    to: email,
    subject: 'Reset Your Password',
    html: resetPassword({ name, token }),
  });

  res.header('accessToken', token);

  // eslint-disable-next-line consistent-return
  return {
    message: 'Link send to your email, please check your email inbox',
  };
};

module.exports = forgotController;
