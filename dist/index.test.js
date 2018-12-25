"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
test('参数必须是{}类型', function () {
    var where0 = '';
    expect(function () { return _1.parseValue(where0); }).toThrow();
    var where1 = [];
    expect(function () { return _1.parseValue(where1); }).toThrow();
    var where5 = {};
    expect(_1.parseValue(where5)).toEqual(where5);
});
test('日期字符串将转化为Date实例', function () {
    var where0 = { d: { $lt: '2018-12-25T00:55:23.931Z' } };
    expect(_1.parseValue(where0).d.$lt).toEqual(new Date('2018-12-25T00:55:23.931Z'));
    expect(_1.parseValue(where0).d.$lt.constructor.name).toBe('Date');
});
var _id = new Array(24).fill(0).join('');
var _id20 = new Array(20).fill(0).join('');
test('_id将转化为ObjectId', function () {
    expect(_1.parseValue({ _id: _id })._id.constructor.name).toBe('ObjectId');
    expect(_1.parseValue({ _id: _id20 })._id.constructor.name).toBe('String');
});
test('xxId将转化为ObjectId', function () {
    expect(_1.parseValue({ xxId: _id }).xxId.constructor.name).toBe('ObjectId');
    expect(_1.parseValue({ xx_yy_3_4Id: _id }).xx_yy_3_4Id.constructor.name).toBe('ObjectId');
    expect(_1.parseValue({ xx_id: _id }).xx_id.constructor.name).toBe('String');
});
test('日期原样返回,用于支持测试', function () {
    expect(_1.parseValue({ d: new Date() }).d.constructor.name).toBe('Date');
});
