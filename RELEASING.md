# Releasing

`main` is the only long-lived branch. Changes reach it through pull requests, merge commits only, and
every pull request and push to `main` must pass the `build` check (`.github/workflows/build.yml`: lint,
test and build on Node.js 20, 22 and 24, run the examples, audit the runtime dependencies, pack).
Merging publishes nothing.

The tests and the examples convert real files against the staging API (`https://stag-v2.convertapi.com/`)
with the `CONVERTAPI_STAGING_TOKEN` repository secret (also set as a Dependabot secret). Pull requests
from forks get no secrets, so their build fails until an admin merges them after review.

A release is a **GitHub Release** whose tag is the version, published by `tomasr78`:

```bash
gh release create v1.15.1 --repo ConvertAPI/convertapi-library-node --target main --title v1.15.1 --generate-notes
```

That runs `.github/workflows/publish.yml` in the `npm` environment, which:

1. refuses a Release published or re-run by anyone else;
2. checks the tag is SemVer (`v1.15.1`, `v1.16.0-beta.1`), that the GitHub pre-release tick matches
   the version, that a stable version is a commit on `main`, and that npm has never had that version;
3. audits the runtime dependencies (high or critical fails), runs the linter and the tests, sets
   `package.json` to the tag's version (`npm version --no-git-tag-version`) and builds `lib/`;
4. publishes the packed tarball to npm with `--provenance`, under the dist-tag `latest` (stable),
   `next` (pre-release) or `maintenance` (a stable version below the current `latest`), and waits until
   npm serves it.

It authenticates with npm **Trusted Publishing** (OIDC, no stored token) once the repository variable
`NPM_TRUSTED_PUBLISHING` is `true`; until then it uses the `NPM_TOKEN` secret. The trusted publisher on
npmjs.com is: organization or user `ConvertAPI`, repository `convertapi-library-node`, workflow
`publish.yml`, environment `npm`.

**Pre-releases** work the same way and may come from any branch:

```bash
gh release create v1.16.0-beta.1 --repo ConvertAPI/convertapi-library-node --target my-branch --prerelease --title v1.16.0-beta.1 --notes "Preview of ..."
```

They install with `npm install convertapi@next`.

npm versions are permanent. A bad version can only be deprecated (`npm deprecate convertapi@1.15.1 "..."`)
and fixed by releasing the next version. Never delete and re-create a release tag.

The version in `package.json` is a `0.0.0-local` placeholder, and `npm publish` from a working copy is
refused. Pull request builds pack `0.0.0-ci.{run}.g{sha}` as a downloadable artifact so a change can be
tried before it is released. Update `CHANGELOG.md` in the pull request that changes behaviour.
