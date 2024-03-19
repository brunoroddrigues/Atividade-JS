"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

 async function up (knex) {
  return knex.schema.createTable('conteudos', table => {
    table.increments('id_conteudo').primary()
    table.string('titulo').notNullable()
    table.string('imagem').notNullable()
    table.string('descricao').notNullable()
    table.text('conteudo', 'longtext').notNullable()
    table.boolean('ativo').notNullable()
    table.string('data_publicacao').notNullable()

    table.integer('id_usuario')
      .unsigned().notNullable()
      .references('id_usuario').inTable('usuarios')
    
    table.integer('id_ferramenta').unsigned()
      .references('id_ferramenta').inTable('ferramentas')
  })
} exports.up = up;

 async function down (knex) {
  return knex.schema.dropTable('conteudos')
} exports.down = down;
  