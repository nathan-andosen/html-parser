![Test Coverage-shield-badge-1](https://img.shields.io/badge/Test%20Coverage-81.85%25-yellow.svg)

## Html-Parser (Work in progress)



## Development

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