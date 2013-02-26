module.exports = function(grunt) {
  
  grunt.registerTask('fast', function() {
    grunt.log.write('Fast task finished.');
  });
  
  grunt.registerTask('block', function() {
    var ms = 1000;
    var start = +(new Date());
    while (new Date() - start < ms);
    grunt.log.write('Blocking finished.');
  });

  //Tasks that log intermediate output
  grunt.registerTask('log500', function() {
    var done = this.async();
    var i = 0;
    var interval = setInterval(function () {
      console.log('500', i);
      i++;
      if (i > 10) {
        clearInterval(interval);
        done();
      }
    }, 500);
  });

  grunt.registerTask('log1000', function() {
    var done = this.async();
    var i = 0;
    var interval = setInterval(function () {
      console.log('1000', i);
      i++;
      if (i > 10) {
        clearInterval(interval);
        done();
      }
    }, 1000);
  });

  // Project configuration.
  grunt.initConfig({
    parallel: {
      assets: [{
        grunt: true,
        args: ['fast']
      }, {
        grunt: true,
        args: ['block']
      },{
        grunt: true,
        args: ['fast']
      }],
      longrunning: [{
        grunt: true,
        args: ['log500']
      }, {
        grunt: true,
        args: ['log1000']
      }]
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

};
