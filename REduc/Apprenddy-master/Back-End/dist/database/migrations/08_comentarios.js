"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

 async function up (knex) {
  return knex.schema.createTable('comentarios', table => {
    table.increments('id_comentario').primary()
    table.string('conteudo').notNullable()
    table.string('data_publicacao').notNullable()

    table.integer('id_usuario')
      .unsigned().notNullable()
      .references('id_usuario').inTable('usuarios')
    
    table.integer('id_conteudo')
      .unsigned().notNullable()
      .references('id_conteudo').inTable('conteudos')
  })
} exports.up = up;

 async function down (knex) {
  return knex.schema.dropTable('comentarios')
} exports.down = down;