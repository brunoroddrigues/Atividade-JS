"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

 async function up (knex) {
  return knex.schema.createTable('notificacoes', table => {
    table.increments('id_notificacao').primary()
    table.string('conteudo').notNullable()

    table.integer('id_usuario')
      .unsigned().notNullable()
      .references('id_usuario').inTable('usuarios')
  })
} exports.up = up;

 async function down (knex) {
  return knex.schema.dropTable('notificacoes')
} exports.down = down;