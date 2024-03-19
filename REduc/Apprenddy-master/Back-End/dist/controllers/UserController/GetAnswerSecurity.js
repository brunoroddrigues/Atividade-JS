"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _UserModel = require('../../models/UsersModel/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);

class GetAnswerSecurity  {constructor() { GetAnswerSecurity.prototype.__init.call(this);GetAnswerSecurity.prototype.__init2.call(this); }
   __init() {this._userModel = new (0, _UserModel2.default)()}

   __init2() {this.show = async (req, res) => {
    const { email } = req.query

    if(!email) return res.status(400).json({ error: 'Bad Request, inform e-mail'})

    const answer = await this._userModel.ReadReturnSelectWithWhereFirst(['pergunta_seguranca'], { email })
    
    return res.json(answer)
  }}
}

exports. default = new GetAnswerSecurity()