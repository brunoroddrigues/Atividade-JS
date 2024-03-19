"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _connection = require('../database/connection'); var _connection2 = _interopRequireDefault(_connection);

class SimpleCRUD {
  constructor ( table) {;this.table = table;SimpleCRUD.prototype.__init.call(this);SimpleCRUD.prototype.__init2.call(this);SimpleCRUD.prototype.__init3.call(this);SimpleCRUD.prototype.__init4.call(this);SimpleCRUD.prototype.__init5.call(this);SimpleCRUD.prototype.__init6.call(this);SimpleCRUD.prototype.__init7.call(this);SimpleCRUD.prototype.__init8.call(this);SimpleCRUD.prototype.__init9.call(this);SimpleCRUD.prototype.__init10.call(this);SimpleCRUD.prototype.__init11.call(this);SimpleCRUD.prototype.__init12.call(this);}

   __init() {this.Create = async (data) => {
    const createData = await _connection2.default.call(void 0, this.table).insert(data)

    return createData
  }}

   __init2() {this.Read = async () => {
    return await _connection2.default.call(void 0, this.table).select('*')
  }}
  
   __init3() {this.ReadWithLimit = async (limit) => {
    return await _connection2.default.call(void 0, this.table).select('*').limit(limit)
  }}

   __init4() {this.ReadFirst = async () => {
    return await _connection2.default.call(void 0, this.table).select('*').first()
  }}

   __init5() {this.ReadWithWhere = async (where) => {
    return await _connection2.default.call(void 0, this.table).where(where).select('*')
  }}

   __init6() {this.ReadWithWhereCount = async (where) => {
    const count = await _connection2.default.call(void 0, this.table).where(where).count().first()

    return count['count(*)']
  }}

   __init7() {this.ReadWithWhereFirst = async (where) => {
    return await _connection2.default.call(void 0, this.table).where(where).select('*').first()
  }}

   __init8() {this.ReadReturnSelect = async (select) => {
    return await _connection2.default.call(void 0, this.table).select(select)
  }}

   __init9() {this.ReadReturnSelectWithWhere = async (select, where) => {
    return await _connection2.default.call(void 0, this.table).select(select).where(where)
  }}

   __init10() {this.ReadReturnSelectWithWhereFirst = async (select, where) => {
    return await _connection2.default.call(void 0, this.table).select(select).where(where).first()
  }}

   __init11() {this.Update = async (data, where) => {
    await _connection2.default.call(void 0, this.table).update(data).where(where)
  }}

   __init12() {this.Delete = async (where) => {
    await _connection2.default.call(void 0, this.table).where(where).first().delete()
  }}
}

exports. default = SimpleCRUD