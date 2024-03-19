"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

 async function up (knex) {
  return knex.schema.createTable('usuarios', table => {
    table.increments('id_usuario').primary()
    table.string('nome').notNullable()
    table.string('email').notNullable().unique()
    table.string('senha').notNullable()
    table.string('foto_perfil')
    table.string('pergunta_seguranca', 20)
    table.string('resposta', 20) 
    table.string('texto_perfil', 200) 
    table.string('capa_perfil')
    table.string('data_entrada').notNullable()
    
    table.integer('id_tipo')
      .unsigned().notNullable()
      .references('id_tipo').inTable('tipo_usuario')
  })
} exports.up = up;

 async function down (knex) {
  return knex.schema.dropTable('usuarios')
} exports.down = down;