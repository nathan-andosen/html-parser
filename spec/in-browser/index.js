
// Our webpack.unit.tests.config.js file uses this to require all unit test files
// so they can be tested in a browser for debugging

// require all test files
var testsContext = require.context('../unit', true, /.spec$/);
testsContext.keys().forEach(testsContext);
