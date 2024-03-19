"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

 async function up (knex) {
  return knex.schema.createTable('tags_conteudos', table => {
    table.increments('id_tag_conteudo').primary()

    table.integer('id_conteudo')
      .unsigned().notNullable()
      .references('id_conteudo').inTable('conteudos')
    
    table.integer('id_tag')
      .unsigned().notNullable()
      .references('id_tag').inTable('tags')
  })
} exports.up = up;

 async function down (knex) {
  return knex.schema.dropTable('tags_conteudos')
} exports.down = down;