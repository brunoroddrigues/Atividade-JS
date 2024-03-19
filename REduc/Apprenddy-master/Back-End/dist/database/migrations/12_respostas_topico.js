"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

 async function up (knex) {
  return knex.schema.createTable('respostas_topico', table => {
    table.increments('id_resposta_topico').primary()
    table.text('conteudo', 'longtext').notNullable()
    table.string('data_publicacao').notNullable()

    table.integer('id_usuario')
      .unsigned().notNullable()
      .references('id_usuario').inTable('usuarios')
    
    table.integer('id_topico_comunidade')
      .unsigned().notNullable()
      .references('id_topico_comunidade').inTable('topicos_comunidade')
  })
} exports.up = up;

 async function down (knex) {
  return knex.schema.dropTable('respostas_topico')
} exports.down = down;