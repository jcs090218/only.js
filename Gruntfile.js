module.exports = function( grunt ) {
  "use strict";

  grunt.initConfig({
    concat: {
      js: {
        src: ['src/**/*.js'],
        dest: 'build/only.js'
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};
