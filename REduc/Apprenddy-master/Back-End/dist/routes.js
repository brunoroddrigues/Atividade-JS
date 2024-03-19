"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _SessionController = require('./controllers/UserController/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _UsersController = require('./controllers/UserController/UsersController'); var _UsersController2 = _interopRequireDefault(_UsersController);
var _UsersDashboard = require('./controllers/UserController/UsersDashboard'); var _UsersDashboard2 = _interopRequireDefault(_UsersDashboard);
var _TipoUsersController = require('./controllers/UserController/TipoUsersController'); var _TipoUsersController2 = _interopRequireDefault(_TipoUsersController);
var _NotificationController = require('./controllers/UserController/NotificationController'); var _NotificationController2 = _interopRequireDefault(_NotificationController);
var _GetAnswerSecurity = require('./controllers/UserController/GetAnswerSecurity'); var _GetAnswerSecurity2 = _interopRequireDefault(_GetAnswerSecurity);
var _UploadController = require('./controllers/UploadController'); var _UploadController2 = _interopRequireDefault(_UploadController);

var _CategoriaController = require('./controllers/PublicationController/CategoriaController'); var _CategoriaController2 = _interopRequireDefault(_CategoriaController);
var _TagsController = require('./controllers/PublicationController/TagsController'); var _TagsController2 = _interopRequireDefault(_TagsController);
var _FerramentasController = require('./controllers/PublicationController/FerramentasController'); var _FerramentasController2 = _interopRequireDefault(_FerramentasController);
var _ConteudosController = require('./controllers/PublicationController/ConteudosController'); var _ConteudosController2 = _interopRequireDefault(_ConteudosController);
var _ComentariosController = require('./controllers/PublicationController/ComentariosController'); var _ComentariosController2 = _interopRequireDefault(_ComentariosController);
var _LikesController = require('./controllers/PublicationController/LikesController'); var _LikesController2 = _interopRequireDefault(_LikesController);

var _TopicoController = require('./controllers/CommunityController/TopicoController'); var _TopicoController2 = _interopRequireDefault(_TopicoController);
var _RespostaController = require('./controllers/CommunityController/RespostaController'); var _RespostaController2 = _interopRequireDefault(_RespostaController);

var _Authorizations = require('./auth/Authorizations'); var _Authorizations2 = _interopRequireDefault(_Authorizations);

// Multer
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('./configs/multer'); var _multer4 = _interopRequireDefault(_multer3);

const routes = _express.Router.call(void 0, )

const upload = _multer2.default.call(void 0, _multer4.default)

routes.post(
  '/uploads',
  upload.single('upload'),
  _UploadController2.default.store
);

routes.post('/signup', _SessionController2.default.signup)
routes.post('/signin', _SessionController2.default.signin)
routes.post('/forgot', _SessionController2.default.forgotPassword)
routes.patch('/changePassword', _Authorizations2.default.show, _SessionController2.default.changePassword)
routes.put('/users/security', _Authorizations2.default.show, _SessionController2.default.changeSecurity)
routes.get('/users/secutiry/answer', _GetAnswerSecurity2.default.show)

routes.post('/authenticated', _Authorizations2.default.show, _Authorizations2.default.authenticated)

routes.get('/notifications', _Authorizations2.default.show, _NotificationController2.default.index)
routes.delete('/notifications', _Authorizations2.default.show, _NotificationController2.default.delete)

routes.get('/users', _UsersController2.default.index)
routes.get('/users/home/info', _Authorizations2.default.show, _UsersController2.default.show)
routes.get('/users/:id/info', _UsersDashboard2.default.show)
routes.put('/users', _Authorizations2.default.show, _UsersController2.default.update)

routes.put('/admin/users/tipo_user', _Authorizations2.default.show, _TipoUsersController2.default.update)

routes.get('/categorias', _CategoriaController2.default.index)
routes.post('/categorias', _Authorizations2.default.show, _CategoriaController2.default.store)
routes.put('/categorias/:id_categoria', _Authorizations2.default.show, _CategoriaController2.default.update)

routes.get('/tags', _TagsController2.default.index)
routes.post('/tags', _Authorizations2.default.show, _TagsController2.default.store)
routes.put('/tags/:id_tag', _Authorizations2.default.show, _TagsController2.default.update)

routes.get('/ferramentas', _FerramentasController2.default.index)
routes.post('/ferramentas', _Authorizations2.default.show, _FerramentasController2.default.store)
routes.put('/ferramentas/:id_ferramenta', _Authorizations2.default.show, _FerramentasController2.default.update)

routes.get('/conteudos', _ConteudosController2.default.index)
routes.get('/conteudos/:id_conteudo', _ConteudosController2.default.show)
routes.post('/conteudos', _Authorizations2.default.show, _ConteudosController2.default.store)
routes.put('/conteudos/:id_conteudo', _Authorizations2.default.show, _ConteudosController2.default.update)
routes.delete('/conteudos/:id_conteudo', _Authorizations2.default.show, _ConteudosController2.default.delete)

routes.get('/comentarios/:id_conteudo', _ComentariosController2.default.index)
routes.post('/comentarios/:id_conteudo', _Authorizations2.default.show, _ComentariosController2.default.store)
routes.put('/comentarios/:id_comentario', _Authorizations2.default.show, _ComentariosController2.default.update)
routes.delete('/comentarios/:id_comentario', _Authorizations2.default.show, _ComentariosController2.default.delete)

routes.post('/conteudos/likes/:id_conteudo',  _Authorizations2.default.show, _LikesController2.default.store)
routes.delete('/conteudos/likes/:id_conteudo', _Authorizations2.default.show, _LikesController2.default.delete)
routes.get('/conteudos/likes/:id_conteudo', _Authorizations2.default.show, _LikesController2.default.get)

routes.get('/comunidade/topico', _TopicoController2.default.index)
routes.post('/comunidade/topico', _Authorizations2.default.show, _TopicoController2.default.store)
routes.put('/comunidade/topico/:id_topico_comunidade', _Authorizations2.default.show, _TopicoController2.default.update)

routes.get('/comunidade/resposta/:id_topico_comunidade', _RespostaController2.default.index)
routes.post('/comunidade/resposta/:id_topico_comunidade', _Authorizations2.default.show, _RespostaController2.default.store)
routes.put('/comunidade/resposta/:id_topico_comunidade', _Authorizations2.default.show, _RespostaController2.default.update)

exports. default = routes