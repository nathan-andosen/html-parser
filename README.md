![Test Coverage-shield-badge-1](https://img.shields.io/badge/Test%20Coverage-96.06%25-brightgreen.svg)

# Html-Parser

A simple forgiving html parser for javascript (browser and nodejs). 

### Features

* Works in NodeJs or the browser
* Parse HTML that may not be valid
* HTML is parsed into a json object, this object can be modified and converted
back into HTML

### Not supported

* CDATA in html is not supported, if requested, it can be added

# How to use

## Installation

``npm install @thenja/html-parser --save``

### Typescript

```javascript
import { HtmlParser } from "@thenja/html-parser";
let htmlParser = new HtmlParser();
```

### Javascript (browser)

```javascript
<script src="dist/thenja-html-parser.min.js" type="text/javascript"></script>
var htmlParser = new Thenja.HtmlParser();
```

## Parse HTML

### Basic usage

```javascript
let html = "<div><p>Hello world!</p></div>";
let output = htmlParser.parse(html);
```

### Example output

```javascript
[
  {
    "type": "tag",
    "tagType": "default",
    "name": "div",
    "attributes": {},
    "children": [
      {
        "type": "tag",
        "tagType": "default",
        "name": "p",
        "attributes": {},
        "children": [
          {
            "type": "text",
            "data": "Hello world!"
          }
        ]
      }
    ]
  }
]
```

### Parse html and reverse the output

```javascript
let html = "<div><p>Hello world!</p></div>";
let output = htmlParser.parse(html);
let reversedHtml = htmlParser.reverse(output);
```

### Listen for errors

```javascript
let html = "<div><p>Hello world!</p></div>";
let output = htmlParser.parse(html, (err) => {
  // handle errors here
});
```

# Development

``npm run init`` - Setup the app for development (run once after cloning)

``npm run dev`` - Run this command when you want to work on this app. It will
compile typescript, run tests and watch for file changes.

## Distribution

``npm run build -- -v <version>`` - Create a distribution build of the app.

__-v (version)__ - _[Optional]_ Either "patch", "minor" or "major". Increase
the version number in the package.json file.

The build command creates a _/compiled_ directory which has all the javascript
compiled code and typescript definitions. As well, a _/dist_ directory is 
created that contains a minified javascript file.

## Testing

_Tests are automatically ran when you do a build._

``npm run test`` - Run the tests. The tests will be ran in a nodejs environment.
You can run the tests in a browser environment by opening the file 
_/spec/in-browser/SpecRunner.html_.


## License

MIT © [Nathan Anderson](https://github.com/nathan-andosen)