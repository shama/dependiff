# dependiff

Compare diffs of dependencies between meta files.

```
 {
   dependencies: {
-    ao-mesher: "~0.2.4"
+    ao-mesher: "~0.2.5"
+    ao-shader: "~0.2.3"
-    gl-now: "~0.0.4"
+    gl-now: "~0.0.3"
-    ndarray: "~1.0.1"
+    ndarray: "~1.0.3"
+    teapot: "~0.0.1"
-    brfs: "~0.0.5"
+    brfs: "~0.0.6"
   }
 }
```

## install

Install globally to access the `dependiff` command:

`npm install -g dependiff`

Or install locally to use programmatically:

`npm install dependiff`

## `dependiff` cli usage

``` shell
$ dependiff path/to/package.json compare/package.json

$ dependiff githubuser/repo anotheruser/repo

$ dependiff githubuser/repo anotheruser/repo --metafile component.json

$ dependiff http://example.com/package.json http://example2.com/component.json
```

## api usage

#### `var dependiff = require('dependiff')(fileA, fileB, [options,] callback)`

- `fileA` and `fileB` are either filepaths or urls to meta files to compare.
- `options`
  - `cwd` Default: `process.cwd()` - Current working directory to search from
  -  `metafile` Default: `'package.json'` - Name of metafile to search for.
  - `keys` Default: `['dependencies', 'devDependencies', 'peerDependencies']` - Keys in metafile to compare.
  - `type` Default: `'diff'` - Type of comparison to run. Options are:
    - `diff` - Returns an object indicated added/deleted lines.
    - `diffString` - Returns a colorized string of the diff.

## Release History

* 0.1.0 initial release

## License

Copyright (c) 2013 Kyle Robinson Young
Licensed under the MIT license.
