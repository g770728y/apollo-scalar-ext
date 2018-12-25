import { GraphQLScalarType } from 'graphql';
import { ObjectId } from 'bson';

function identity<T = any>(value: T): T {
  return value;
}

function _parseValue(value: any): any {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === null ||
    value === undefined
  ) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(_parseValue);
  }

  if (typeof value === 'object') {
    const _value: Record<string, any> = {};
    Object.keys(value).forEach(k => {
      const v = value[k];

      if (/^[\d]{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ$/.test(v)) {
        // Date字符串  -> Date实例
        _value[k] = new Date(v);
      } else if (
        /(^\_id$)|(^[a-zA-Z0-9\_]+Id$)/.test(k) &&
        typeof v === 'string' &&
        v.length === 24
      ) {
        // questionId / _id 字符串 -> ObjectId实例
        _value[k] = new ObjectId(v);
      } else {
        _value[k] = _parseValue(v);
      }
    });
    return _value;
  }

  return value;
}

export function parseValue(value: any): any {
  // value必须是{}类型
  if (typeof value === 'object' && !Array.isArray(value)) {
    return _parseValue(value);
  }

  throw new Error(`where必须是{}类型:${value}: ${typeof value}`);
}

function parseLiteral(ast: any, variables: any): any {
  return ast.value;
}

const GraphqlMongoWhere = new GraphQLScalarType({
  name: 'WHERE',
  description: "Then `WHERE` scalar type reprents mongo's where clause",
  serialize: identity,
  parseValue,
  parseLiteral
});

export default GraphqlMongoWhere;
