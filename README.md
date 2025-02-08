User Note
---------

This component provide ability to show iran license plate. for now, it only supports basic template. and it is provided new feature called shadow-root, and intended to be used on pages without use of any framework and be used with pure or any supporting application.

The initial HTML/CSS template of iranian license plate were created by `Mehdi Hadjar` and can be found in https://codepen.io/mhdhadjar/pen/YzXOaNL

Now it is enhanced and turned into a component by Hassan Faghihi.

Usage:
```html
<link href="/path/to/iran-vehicle-plate.css" />
<iran-vehicle-plate
    left-part="dataLeftPart"
    alphabet-part="dataAlphabetPart"
    right-part="dataRightPart"
    code-part="dataCodePart"
    ></iran-vehicle-plate>
<script src="/path/to/iran-vehicle-plate.js"></script>
```

------------------
### Notes To Me

Auto versioning with `postversion` script and publish
```shell
npm version patch
npm publish
```

Tagging Commit:
```shell
git tag -a v1.0.0 -m "Release v1.0.0"
```