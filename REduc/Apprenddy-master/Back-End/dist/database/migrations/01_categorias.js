"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

 async function up (knex) {
  return knex.schema.createTable('categorias', table => {
    table.increments('id_categoria').primary()
    table.string('descritivo').notNullable().unique()
  })
} exports.up = up;

 async function down (knex) {
  return knex.schema.dropTable('categorias')
} exports.down = down;