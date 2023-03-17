## %{name}%

This is a React project. To launch the development server run:

```
$ run dev:run
```

## License
® License %{license}% by %{git.name}%

## React TS + Vite + ESLint + Testing

Base setup for a React project with all the required components for a solid front-end development experience.


- `tsconfig.json`: TS configuration file for react code
- `tsconfig.node.json`: TS config for vite

```
$ npm create vite@latest
```

### ESLint

eslint uses [airbnb style guide](https://airbnb.io/javascript/react). To install airbnb deps, if we do `npx install-peerdeps --dev elint-config-airbnb` we might fail with an `ERR null`.

Instead use the following:

```bash
(
    export PKG=eslint-config-airbnb;
    npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
)
```

In `.eslintrc.cjs`:
- Remove `"eslint:recommended"`
- Add:

```js
extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
],
```

NOTE: If using VSCode install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension


Add plugins to support [TypeScript](https://www.npmjs.com/package/eslint-config-airbnb-typescript):

```console
$ npm install -D eslint-config-airbnb-typescript
```

In `.eslintrc.cjs` add `airbnb-typescript`:
```js
extends: [
    'airbnb',
    'airbnb-typescript',
    ...
],
```

Edit `parserOptions`:

```js
parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
    },
```


Fix error in `module.exports = {`, go to `tsconfig.json` and include linter rc file:

```json
"include": [
    ".eslintrc.cjs",
    "src"
  ],
```

If we go to **App.tsx** we see the following error:
>'React' must be in scope when using JSX

In later react versions this is not true anymore, how to disable this rule:
- On the squiggly line showing the error do `CMD + .` and select first option `Disable react/react-in-jsx-scope for this line`.
- Copy the rule name `react/react-in-jsx-scope`
- Go to `.eslintrc.cjs` and add to `rules`:
```js
rules: {
    'react/react-in-jsx-scope': 0,
},
```

### Prettier

Install dependencies:
```console
$ npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

Create `.prettierrc.cjs`:

```js
module.exports = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: true,
    singleQuote: true,
};
```

Add prettier to eslint, edit `.eslintrc.cjs`:

```js
plugins: [
    ...
    'prettier',
],
```
And to then extend, make sure is the last entry so that prettier can override previous settings:
```js
extends: [
    ...
    'plugin:prettier/recommended',
],
```

### Vitest

Install [vitest](https://vitest.dev/):

```console
$ npm i -D vitest
```

Grab the config example from [here](https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib-msw/vite.config.ts) and update `vite.config.ts`:

```ts
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setup.ts'],
  },
})
```

Then, fix error in `vite.config.ts`:
>Parsing error: ESLint was configured to run on `<tsconfigRootDir>/vite.config.ts` using `parserOptions.project`

Add to `tsconfig.json`:

```json
"include": [
    "vite.config.ts",
    ...
],
```

Also, at the beginning of the `vite.config.ts` file add to get rid of the error about vite being a developer dependency:
```ts
/* eslint-disable import/no-extraneous-dependencies */
```

NOTE: Reload window to get rid of error.

Update `vite.config.ts` `setupFiles` and create file `ci src/setupTests.ts`.

### Testing Library

Install [testing-library](https://testing-library.com/docs/react-testing-library/intro/) and testing-library [jest-dom extensions](https://github.com/testing-library/jest-dom) to get DOM expectations.


```console
npm install --save-dev @testing-library/react @testing-library/jest-dom jsdom
```

Edit `src/setupTests.ts`:

```ts
/* eslint-disable import/no-extraneous-dependencies */
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);
```

Update `package.json` scripts:

```json
"test": "vitest"
```

NOTE: Check out the [testing library documentation](https://testing-library.com/docs/queries/about/#priority) for info on how to write tests 💪🏽

### React Router


Examples of how to integrate [testing with react router](https://testing-library.com/docs/example-react-router/).
