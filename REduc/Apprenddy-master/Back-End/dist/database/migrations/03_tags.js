"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

 async function up (knex) {
  return knex.schema.createTable('tags', table => {
    table.increments('id_tag').primary()
    table.string('descritivo').notNullable()
  })
} exports.up = up;

 async function down (knex) {
  return knex.schema.dropTable('tags')
} exports.down = down;