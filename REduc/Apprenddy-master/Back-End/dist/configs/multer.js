"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _path = require('path');

exports. default = {
  storage: _multer2.default.diskStorage({
    destination: (request, file, cb) => {
      return cb(
        null,
        _path.resolve.call(void 0, __dirname, '..', '..', 'tmp', 'uploads')
      );
    },
    filename: (request, file, cb) => {
      _crypto2.default.randomBytes(16, (err, response) => {
        if (err) return cb(err, '');

        return cb(null, response.toString('hex') + _path.extname.call(void 0, file.originalname));
      });
    },
  }),
};