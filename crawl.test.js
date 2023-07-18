const { normalizeURL } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const output = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(output).toEqual(expected);
});

test("normalizeURL strip trailing slash in the end of the URL", () => {
  const input = "https://blog.boot.dev/path/";
  const output = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(output).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://BLOG.boot.dev/path/";
  const output = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(output).toEqual(expected);
});

test("normalizeURL http protocol", () => {
  const input = "http://BLOG.boot.dev/path/";
  const output = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(output).toEqual(expected);
});
