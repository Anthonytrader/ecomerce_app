// image.router.js
const express = require('express');
const { getAll, create, getOne, remove, update } = require('../controllers/Image.controllers');
const upload = require("../utils/multer");
const verifyJWT=require("../utils/verifyJWT");
const imageRouter = express.Router();

imageRouter.route('/images')
  .get(verifyJWT,getAll)
  .post(verifyJWT,upload.single("image"), create);

imageRouter.route('/images/:id')
  .get(getOne)
  .delete(verifyJWT,remove)
  .put(update);

module.exports = imageRouter;
