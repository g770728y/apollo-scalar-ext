"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var bson_1 = require("bson");
function identity(value) {
    return value;
}
function _parseValue(value) {
    if (typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value === null ||
        value === undefined) {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map(_parseValue);
    }
    if (typeof value === 'object') {
        var _value_1 = {};
        Object.keys(value).forEach(function (k) {
            var v = value[k];
            if (/^[\d]{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ$/.test(v)) {
                // Date字符串  -> Date实例
                _value_1[k] = new Date(v);
            }
            else if (/(^\_id$)|(^[a-zA-Z0-9\_]+Id$)/.test(k) &&
                typeof v === 'string' &&
                v.length === 24) {
                // questionId / _id 字符串 -> ObjectId实例
                _value_1[k] = new bson_1.ObjectId(v);
            }
            else {
                _value_1[k] = _parseValue(v);
            }
        });
        return _value_1;
    }
    return value;
}
function parseValue(value) {
    // value必须是{}类型
    if (typeof value === 'object' && !Array.isArray(value)) {
        return _parseValue(value);
    }
    throw new Error("where\u5FC5\u987B\u662F{}\u7C7B\u578B:" + value + ": " + typeof value);
}
exports.parseValue = parseValue;
function parseLiteral(ast, variables) {
    return ast.value;
}
var GraphqlMongoWhere = new graphql_1.GraphQLScalarType({
    name: 'MONGO_WHERE',
    description: "Then `MONGO_WHERE` scalar type reprents mongo's where clause",
    serialize: identity,
    parseValue: parseValue,
    parseLiteral: parseLiteral
});
exports.default = GraphqlMongoWhere;
