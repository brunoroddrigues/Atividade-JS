"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

 async function up (knex) {
  return knex.schema.createTable('ferramentas', table => {
    table.increments('id_ferramenta').primary()
    table.string('descritivo').notNullable()
    table.string('icone').notNullable()

    table.integer('id_categoria')
      .unsigned().notNullable()
      .references('id_categoria').inTable('categorias')
  })
} exports.up = up;

 async function down (knex) {
  return knex.schema.dropTable('ferramentas')
} exports.down = down;