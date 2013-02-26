/*
 * grunt-parallel
 * https://github.com/iammerrick/grunt-parallel
 *
 * Copyright (c) 2013 Merrick Christensen
 * Licensed under the MIT license.
 */
/*jshint es5:true*/
module.exports = function(grunt) {
  var Q = require('q');

  function spawn(task) {
    var deferred = Q.defer();

    ps = grunt.util.spawn(task, function(error, result, code) {
      if (error || code !== 0) {
        if (error.message) {
          grunt.log(error.message);
        }
        return deferred.reject();
      }

      deferred.resolve();
    });

    ps.stdout.setEncoding('utf8');
    ps.stderr.setEncoding('utf8');
    ps.stdout.on('data', function(data) {
      grunt.log.write(data);
    });
    ps.stderr.on('data', function(data) {
      grunt.log.write(data);
    });

    return deferred.promise;
  }

  grunt.registerMultiTask('parallel', 'Run sub-tasks in parallel.', function() {
    Q.all(this.data.map(spawn)).then(this.async());
  });
};
