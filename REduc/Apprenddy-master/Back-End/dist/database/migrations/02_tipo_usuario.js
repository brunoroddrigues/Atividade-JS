"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

 async function up (knex) {
  return knex.schema.createTable('tipo_usuario', table => {
    table.increments('id_tipo').primary()
    table.string('descritivo').notNullable()
  })
} exports.up = up;

 async function down (knex) {
  return knex.schema.dropTable('tipo_usuario')
} exports.down = down;