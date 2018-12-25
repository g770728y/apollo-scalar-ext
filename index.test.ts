import { parseValue } from '.';

test('参数必须是{}类型', () => {
  const where0 = '';
  expect(() => parseValue(where0)).toThrow();

  const where1: any = [];
  expect(() => parseValue(where1)).toThrow();

  const where5 = {};
  expect(parseValue(where5)).toEqual(where5);
});

test('日期字符串将转化为Date实例', () => {
  const where0 = { d: { $lt: '2018-12-25T00:55:23.931Z' } };
  expect(parseValue(where0).d.$lt).toEqual(
    new Date('2018-12-25T00:55:23.931Z')
  );
  expect(parseValue(where0).d.$lt.constructor.name).toBe('Date');
});

const _id = new Array(24).fill(0).join('');
const _id20 = new Array(20).fill(0).join('');

test('_id将转化为ObjectId', () => {
  expect(parseValue({ _id })._id.constructor.name).toBe('ObjectId');
  expect(parseValue({ _id: _id20 })._id.constructor.name).toBe('String');
});

test('xxId将转化为ObjectId', () => {
  expect(parseValue({ xxId: _id }).xxId.constructor.name).toBe('ObjectId');
  expect(parseValue({ xx_yy_3_4Id: _id }).xx_yy_3_4Id.constructor.name).toBe(
    'ObjectId'
  );
  expect(parseValue({ xx_id: _id }).xx_id.constructor.name).toBe('String');
});
