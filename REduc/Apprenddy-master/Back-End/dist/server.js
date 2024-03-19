"use strict";
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var _express = require("express");
var _express2 = _interopRequireDefault(_express);
var _path = require("path");
var _path2 = _interopRequireDefault(_path);
var _cors = require("cors");
var _cors2 = _interopRequireDefault(_cors);

var _routes = require("./routes");
var _routes2 = _interopRequireDefault(_routes);

const app = _express2.default.call(void 0);

app.use(_cors2.default.call(void 0));
app.use(_express2.default.json());
app.use(
  "/uploads",
  _express2.default.static(
    _path2.default.resolve(__dirname, "..", "tmp", "uploads")
  )
);
app.use(_routes2.default);
app.listen(process.env.PORT || 3333);
