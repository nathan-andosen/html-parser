![Test Coverage-shield-badge-1](https://img.shields.io/badge/Test%20Coverage-96.44%25-brightgreen.svg)

# Html-Parser

A simple forgiving html parser for javascript (browser and nodejs). 

### Features

* Works in NodeJs or the browser
* Parse HTML that may not be valid
* HTML is parsed into a json object, this object can be modified and converted
back into HTML
* Ability to clean HTML, such as remove empty tags and more.

### Not supported

* CDATA in html is not supported

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

### Listen for nodes being added when parsing

```javascript
// In this example we will replace .jpg extensions with .png
let html = "<div><img src='my-picture.jpg' /></div>";
let output = htmlParser.parse(html, null, (node, parentNode) => {
  if(node.name === 'img' && node.attributes && node.attributes.src) {
    node.attributes.src = node.attributes.src.replace('.jpg', '.png');
  }
});
let newHtml = htmlParser.reverse(output);
// newHtml will equal: <div><img src='my-picture.png' /></div>
```

### Listen for nodes being stringified when reversing

```javascript
// In this example we will remove the class attribute
let html = "<div class='my-style'></div>";
let output = htmlParser.parse(html);
let newHtml = htmlParser.reverse(output, (node) => {
  if(node.name === 'div') {
    delete node.attributes['class'];
  }
});
// newHtml will equal: <div></div>
```

### Clean up the html

The clean function allows you to remove unwanted html tags (such as empty tags) and empty text nodes.

__Available options:__

|Options|Description|
|-------|-----------|
|removeEmptyTags|Remove empty html tags, such as ``<p></p>``|
|removeEmptyTextNodes|Basically remove a text node if it only contains whitespace|


```javascript
let html = "<div>Hi there<p></p></div>";
// by default, clean options are true, so this is only here for demo purposes
let cleanOptions = { removeEmptyTags: true, removeEmptyTextNodes: true };
let output = htmlParser.parse(html);
output = htmlParser.clean(output, cleanOptions);
let newHtml = htmlParser.reverse(output);
// newHtml will equal: <div>Hi there</div>
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

# ToDo

1. Add in more unit tests

2. Add in a flattenText() function. This will flatten many nested text nodes into one text node.

```html
<p>My name is <strong>Nathan</strong></p>
Flattened to:
<p>My name is Nathan</p>
```