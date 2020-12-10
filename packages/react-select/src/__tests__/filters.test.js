import { createFilter } from '../filters';

test('matchFrom > start-word > to find a match at the start of the string', () => {
  const filter = createFilter({
    matchFrom: 'start-word',
    stringify: String,
  });
  expect(filter('bar foo', 'bar')).toBe(true);
});

test('matchFrom > start-word > to find a match at the start of a word further into the string', () => {
  const filter = createFilter({
    matchFrom: 'start-word',
    stringify: String,
  });
  expect(filter('foo bar', 'bar')).toBe(true);
});

test('matchFrom > start-word > to ignore a match within a word', () => {
  const filter = createFilter({
    matchFrom: 'start-word',
    stringify: String,
  });
  expect(filter('foo bar', 'oo')).toBe(false);
});

test('matchFrom > start-word > to find match preceded by a match that was not at the start of a word', () => {
  const filter = createFilter({
    matchFrom: 'start-word',
    stringify: String,
  });
  expect(filter('foo ooze', 'oo')).toBe(true);
});
