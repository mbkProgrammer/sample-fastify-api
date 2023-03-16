const loginSchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: {
        type: 'string',
        minLength: 8,
        pattern: '^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$',
      },
    },
  },
};

module.exports = loginSchema;
