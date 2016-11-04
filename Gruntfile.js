'use strict';

module.exports = function(grunt) {

  let version = JSON.parse(grunt.file.read('./package.json')).version;
  // Project configuration.
  grunt.initConfig({
    version: version,
    concat: {
      dist: {
        src: ['lib/umd-header.js', '*.min.js'],
        dest: 'template-<%= version %>.min.js',
      },

      forNode: {
        src: ['lib/umd-header.js', '*.min.js'],
        dest: 'index.js',
      }
    },
    nodeunit: {
      files: ['test/**/*_test.js'],
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      },
    },
    requirejs: {
      compile: {
        options: {
          // optimize: 'none',
          // skipDirOptimize: true,
          baseUrl: './',
          name: 'template',
          out: "./template-<%= version %>.min.js",
          paths: {
            dtools: 'empty:',
            jquery: 'empty:',
          },
          exclude: ['dtools']
        }
      }
    },

    uglify: {
      my_target: {
        files: {
          './template-<%=version%>.min.js': ['*.min.js']
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);
  grunt.registerTask('release', ['requirejs', 'concat:forNode', 'concat:dist', 'uglify']);

};
