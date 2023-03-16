const throwError = (reply, errCode, message) => {
  reply.code(401).send({
    statusCode: 401,
    error: errCode,
    message,
  });
};

module.exports = throwError;
