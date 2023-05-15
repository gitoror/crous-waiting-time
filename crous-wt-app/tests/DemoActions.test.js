import { assert, expect, test } from 'vitest';

//////////////////////////////
// console.log('this is a test');
//////////////////////////////

// SET-UP
const object = {
  a: 1,
  b: 2,
};

// TESTS

test('test1', () => {
  expect(object.a).toBe(1);
});
