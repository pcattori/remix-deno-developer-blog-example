# Remix Deno Template

```sh
npx create-remix@latest --template <path/to/this/template>
```

## Known issues

### dev

Deno server is not currently configured to live reload when `--watch` detects changes, requiring a refresh in the browser for non-server changes (e.g. changing JSX content).

Will look into this.

### React

For all React-related imports (including `@remix-run/*` imports), we append `?pin=v68` to the URL.
This is the only reliable way we were able to guarantee that only one copy of React would be present in the browser.

No plans on how to address this yet.

### remix-deno

For now, we are inlining Remix's `@remix-run/deno` package into `remix-deno` to enable faster experimentation and development.

In the future, this template would not include the `remix-deno` directory at all.
Instead, users could import from `@remix-run/deno` (exact URL TBD).

### package.json

A `package.json` is included for now so that `remix` CLI (from `@remix-run/dev`) can run the Remix compiler.

In the future, we could provide a stand-alone executable for the Remix compiler OR `npx remix`, and we would remove the `package.json` file from this Deno template.

### server.ts

#### @remix-run/dev/server-build

The `@remix-run/dev/server-build` import within `server.ts` (`import * as build from '@remix-run/dev/server-build'`) is a special import for the Remix compiler that points to the built server entry point (typically within `./build`).

The `vscode_deno` plugin complains about this import with a red squiggly underline as Deno cannot resolve this special import.

No plans on how to address this yet.

#### installGlobals

Remix depends on specific globals (`sign`/`unsign`) for internal functionality (cookie signing).
Right now, the values for those globals are defined in the local `remix-deno` package.
The globals are _actually_ assigned these values in the `installGlobals` function that must be called in user code (i.e. `server.ts`).

In the future, we plan to obviate these globals (`sign`/`unsign`), removing the `installGlobals` call (and even the import) from user code in `server.ts`.
