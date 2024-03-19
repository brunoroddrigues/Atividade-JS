"use strict";Object.defineProperty(exports, "__esModule", {value: true});function nowDateUTC () {
  const date = new Date()

  const dateUTC = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  ).toString()
  
  
  return dateUTC
}

exports. default = nowDateUTC