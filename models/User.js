const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../configs/db');

// const secretKey = process.env.SECRET_KEY;

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  address: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'users',
});

User.createToken = (user) => {
  const expiresIn = '7d'; // Token expires in 1 day
  const secret = '26pS+a4ClqmHOKyPYVF6Go2RZexJdN3uNteAc+RTxjNZ51DTY2c84rggUrvcjQ+A'; // Replace with your own secret key

  // Create a new JWT token
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      isAdmin: user.is_admin,
    },
    secret,
    { expiresIn },
  );

  return token;
};

User.validateAccessToken = async (accessToken) => {
  const secret = '26pS+a4ClqmHOKyPYVF6Go2RZexJdN3uNteAc+RTxjNZ51DTY2c84rggUrvcjQ+A';
  try {
    const decoded = jwt.verify(accessToken, secret);
    const user = await User.findOne({
      where: {
        id: decoded.userId,
      },
    });
    // const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    return null;
  }
};

// eslint-disable-next-line arrow-body-style
User.validPassword = (myPlaintextPassword, user) => {
  return bcrypt.compare(myPlaintextPassword, user.password);
};

User.encryptPassword = async (myPlaintextPassword) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(myPlaintextPassword, salt);

  return hash;
};

module.exports = User;
