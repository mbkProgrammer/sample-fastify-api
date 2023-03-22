const User = require('../models/User');
const resetPassNotif = require('../template/resetPassNotifTemplate');
const throwError = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail');

const resetPasswordController = async (req, res) => {
  const { password, token } = req.body;

  const userExistance = await User.validateForgotToken(token);

  if (!userExistance) {
    throwError(res, 'TOKEN', 'This Token is invalid!');
    return;
  }

  const { name, email } = userExistance.dataValues;
  await User.update({
    password: await User.encryptPassword(password),
    forgot_token: null,
  }, { where: { email } });

  await sendEmail({
    to: email,
    subject: 'Reset Your Password',
    html: resetPassNotif({ name }),
  });

  // eslint-disable-next-line consistent-return
  return {
    message: 'your password has been change',
  };
};

module.exports = resetPasswordController;
