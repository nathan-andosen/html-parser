var isWindows = (process.platform === "win32");
var bashCmd = (isWindows) ? 'bash ' : '';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  
  var init = {};
  
  // execute bash commands
  init.exec = {
    tsc : {
      cmd : bashCmd + './node_modules/.bin/tsc'
    },
    compileBrowserTests : {
      cmd : 'bash ./scripts/browser-compile-unit-tests.sh'
    },
    testCoverage: {
      cmd: 'bash ./scripts/test-coverage.sh'
    }
  };
  
  
  // watch tasks
  init.watch = {
    dev : {
      files : [
        "src/**/*.ts",
        "spec/**/*.ts"
      ],
      tasks : ["builddev"]
    }
  };
  
  
  grunt.initConfig(init);
  
  // our grunt commands
  grunt.registerTask("builddev", ["exec:tsc", "exec:testCoverage"]);
  grunt.registerTask("dev", ["builddev", "watch:dev"]);
  grunt.registerTask("test", ["exec:tsc", "exec:testCoverage", "exec:compileBrowserTests"]);
  grunt.registerTask("coverage", ["exec:tsc", "exec:testCoverage"]);
};