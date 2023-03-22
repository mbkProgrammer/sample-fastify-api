const resetPassSchema = {
  body: {
    type: 'object',
    required: ['token', 'password'],
    properties: {
      token: { type: 'string' },
      password: {
        type: 'string',
        minLength: 8,
        pattern: '^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$',
      },
    },
  },
};

module.exports = resetPassSchema;
