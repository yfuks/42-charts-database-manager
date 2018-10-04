var api = require('../libraries/api');
var mysql = require('../libraries/mysql').client();
var registerCoalitions = require('../scripts/registerCoalitions');

module.exports = (grunt) => {
  grunt.task.registerTask('register-coalitions', 'Fill coalitions table', function () {
    const done = this.async();
    api.getCoalitions()
      .then((coalitions) => {
        mysql.connect((error) => {
          if (error) {
            mysql.end();
            done(error);
            return;
          }
          registerCoalitions(coalitions, mysql, (err) => {
            mysql.end();
            done(err);
          });
        });
      })
      .catch(err => {
        mysql.end();
        done(err);
      });
  });
};
