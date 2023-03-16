const signUpSchema = {
  body: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: {
        type: 'string',
        minLength: 8,
        pattern: '^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$',
      },
    },
  },
};

module.exports = signUpSchema;
