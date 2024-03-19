"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _datefns = require('date-fns');

function FormatDate(date) {
  const newDate = new Date(date)

  const formated = _datefns.format.call(void 0, newDate, "dd'/'MM'/'yyyy")

  return formated
}

exports. default = FormatDate