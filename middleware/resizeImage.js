const sharp = require('sharp');
const fs = require('fs');

const resizeImage = async (req, res, next) => {
  console.log('req.file', req.file);
  if (!req.file) {
    return next(new Error('no file uploaded'));
  }
  await sharp(req.file.path)
    .resize({
      width: 1200,
      height: 630,
      fit: 'cover',
      position: 'center',
    })
    .jpeg({
      quality: 80,
      chromaSubsampling: '4:4:4',
      progressive: true,
      optimizeScans: true,
    })
    .toFile(`public/uploads/posts/${req.file.filename.split('.')[0]}.jpg`);
  await fs.unlinkSync(req.file.path);
  return next();
};

module.exports = resizeImage;
