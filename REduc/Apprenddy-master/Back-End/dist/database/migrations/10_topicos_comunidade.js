"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

 async function up (knex) {
  return knex.schema.createTable('topicos_comunidade', table => {
    table.increments('id_topico_comunidade').primary()
    table.string('titulo').notNullable()
    table.text('conteudo', 'longtext').notNullable()
    table.boolean('ativo').notNullable()
    table.boolean('aberto').notNullable()
    table.string('data_publicacao').notNullable()

    table.integer('id_usuario')
      .unsigned().notNullable() 
      .references('id_usuario').inTable('usuarios')
  })
} exports.up = up;

 async function down (knex) {
  return knex.schema.dropTable('topicos_comunidade')
} exports.down = down;