module.exports = function(grunt) {

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-jasmine");

  grunt.initConfig({
    meta: {
      version: "0.0.2",
    },

    jasmine: {
      stream: {
        src: "stream.js",
        options: {
          specs: "*.spec.js",
          template: require("grunt-template-jasmine-requirejs"),
          templateOptions: {
            requireConfig: {
              paths: {
                "jquery": "components/jquery/jquery",
                "bigbird": "components/bigbird/bigbird"
              },
              shim: {
                "bigbird": {
                  deps: ["jquery"]
                }
              }
            }
          }
        }
      }
    },

    jshint: {
      all: ["stream*.js"],
      options: {
        jshintrc: ".jshintrc"
      }
    }
  });

  grunt.registerTask("default", [
    "jasmine",
    "jshint"
  ]);

};
