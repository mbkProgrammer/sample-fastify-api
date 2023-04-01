const multer = require('fastify-multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('file', file);
    cb(null, path.join(__dirname, '../tmp'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `post-${uniqueSuffix}${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({ storage });

module.exports = upload;
