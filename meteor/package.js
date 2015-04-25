Package.describe({
  name: 'mantarayar:todo',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Make sure your TODOs get completed by making them throw exceptions',
  // URL to the Git repository containing the source code for this package.
  git: 'http://github.com/mantarayar/todo-js',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('../src/todo.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('mantarayar:todo');
  api.addFiles('todo-tests.js');
});
