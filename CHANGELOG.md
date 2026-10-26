# Changelog

All notable changes to the `convertapi` npm package. Versions follow [Semantic Versioning](https://semver.org/);
each one is a GitHub Release `v{version}` (see [RELEASING.md](RELEASING.md)).

## 1.16.0 - 2026-10-26

- TypeScript: `Result.files` is now `ResultFile[]` and `saveFiles()` returns `Promise<string[]>`. They were
  typed as one-element tuples, so `files[1]` or `files.length === 2` failed to compile for conversions that
  return several files (#94, #95). Nothing changes at runtime. TypeScript code that spells out the old
  `[ResultFile]` / `[string]` types, or uses `noUncheckedIndexedAccess`, may need a small update.
- README: the base URI option is `baseUri` (#90).
- Development: tests run on chai 6 and mocha 12 with c8 coverage; dev dependencies updated.

## 1.15.2 - 2026-10-20

The first release from the new pipeline. v1.15.1 was tagged but never reached npm: its publish workflow
passed the tarball as `out/...`, which npm reads as a GitHub repository.

- Require axios 1.20.0 or later (was 1.6.2), which pulls in fixed follow-redirects and form-data. This
  closes the high and critical advisories in what `npm install convertapi` resolves, among them
  GHSA-jqh4-m9w3-8hp9, GHSA-fjxv-7rqg-78g4 and GHSA-r4q5-vmmm-2653.
- The examples and README use an API token (`API_TOKEN`) instead of the retired secret and API key.
- The PDF thumbnail example converts the first page straight to JPG (`PageRange: 1`), since `pdf → extract`
  is now the data-extraction converter and returns JSON.
- `package.json` points at the renamed repository, https://github.com/ConvertAPI/convertapi-library-node.
- Published from GitHub Actions with npm provenance. Tested on Node.js 20, 22 and 24.

## 1.15.0 - 2024-09-14

- Authenticate with the `Authorization` header.
- Remove alternative converter support.
- axios 1.7.4, follow-redirects 1.15.9.

## 1.14.0 - 2024-01-23

- Keep-alive connections (`keepAlive` option, on by default).
