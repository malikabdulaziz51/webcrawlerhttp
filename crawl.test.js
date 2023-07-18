const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
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

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
<html>
    <body>
      <a href="https://google.com/path/">
        Google
      </a>
    </body>
</html>
`;
  const inputBaseURL = "https://google.com/path/";
  const output = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://google.com/path/"];
  expect(output).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
<html>
    <body>
      <a href="/path/">
        Google
      </a>
    </body>
</html>
`;
  const inputBaseURL = "https://google.com";
  const output = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://google.com/path/"];
  expect(output).toEqual(expected);
});

test("getURLsFromHTML aboslute and relative", () => {
  const inputHTMLBody = `
<html>
    <body>
      <a href="https://google.com/path1/">
        Google 1
      </a>
      <a href="/path2/">
        Google 2
      </a>
    </body>
</html>
`;
  const inputBaseURL = "https://google.com";
  const output = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://google.com/path1/", "https://google.com/path2/"];
  expect(output).toEqual(expected);
});

test("getURLsFromHTML bad URL", () => {
  const inputHTMLBody = `
<html>
    <body>
      <a href="invalid">
        Invalid URL
      </a>
    </body>
</html>
`;
  const inputBaseURL = "https://google.com";
  const output = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(output).toEqual(expected);
});
