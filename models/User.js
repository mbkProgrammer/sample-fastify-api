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
  forgot_token: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: false,
  tableName: 'users',
});

User.createForgotToken = ({ userId, email }) => {
  const expiresIn = '1h'; // Token expires in 1 day
  const secret = process.env.SECRET_FORGOT_KEY; // Replace with your own secret key

  const token = jwt.sign(
    {
      userId,
      email,

    },
    secret,
    { expiresIn },
  );

  return token;
};

User.validateForgotToken = async (forgotToken) => {
  const secret = process.env.SECRET_FORGOT_KEY;
  try {
    const decoded = jwt.verify(forgotToken, secret);
    const user = await User.findOne({
      where: {
        id: decoded.userId,
        email: decoded.email,
        forgot_token: forgotToken,
      },
    });

    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    return null;
  }
};

User.createToken = (user) => {
  const expiresIn = '7d'; // Token expires in 1 day
  const secret = process.env.SECRET_KEY; // Replace with your own secret key

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
  const secret = process.env.SECRET_KEY;
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
