"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


 async function seed (knex) {
  await knex('tipo_usuario').insert([
    { descritivo: 'Comum' },
    { descritivo: 'Administrador' },
    { descritivo: 'Moderador' },
  ])
} exports.seed = seed;