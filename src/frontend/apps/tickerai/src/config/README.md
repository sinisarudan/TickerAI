# Build

```sh
yarn build
```

## Problem

Angular web component has an issue with webpack build which triggers a strange error: [Webpack generated library triggers Error: "Angular JIT compilation failed: '@angular/compiler' not loaded!" #44436](https://github.com/angular/angular/issues/44436)

Therefore we have, currently ?, to strip the webpack bootstrap header and footer as explained in the github issue.

Remove the line (and preceding): `;// CONCATENATED MODULE:`
Remove the line (and following): `window.global = __webpack_exports__;`
