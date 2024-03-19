"use strict";Object.defineProperty(exports, "__esModule", {value: true});

class UploadController {constructor() { UploadController.prototype.__init.call(this); }
   __init() {this.store = async (req, res) => {
    const { filename } = req.file;

    return res.status(201).json({url: `http://localhost:3333/uploads/${filename}`})
  }}
}

exports. default = new UploadController()
