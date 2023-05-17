require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');
const colors = require('colors');

cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
});

const multerConfigs = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      return cb(null, 'images');
    },
    filename: (req, file, cb) => {
      return cb(
        null,
        `${new Date().getTime() * Math.random()}${file.originalname}`
      );
    },
  }),

  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      return cb(null, true);
    } else {
      return cb(null, false);
    }
  },
};

const uploader = multer(multerConfigs);

const uploadToCloud = async (path) => {
  const file = await cloudinary.uploader.upload(path, {
    folder: 'chat-app-dps',
  });

  await fs.unlink(path, () => {
    console.log('File Deleted'.red.bold);
  });

  return file.url;
};

module.exports = {
  uploader,
  uploadToCloud,
};
