"use strict";

var _require = require("express"),
    Router = _require.Router; // ROUTES


var pokemon = require("./pokemon");

module.exports = function () {
  var app = Router();
  pokemon(app);
  return app;
};