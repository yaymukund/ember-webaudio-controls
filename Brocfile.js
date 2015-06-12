/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

/*
  This Brocfile specifes the options for the dummy test app of this
  addon, located in `/tests/dummy`

  This Brocfile does *not* influence how the addon or the app using it
  behave. You most likely want to be modifying `./index.js` or app's Brocfile
*/

var app = new EmberAddon();
app.import('bower_components/webaudio-player/dist/webaudio-player.js', {
  exports: {
    'webaudio-player/cache': ['default'],
    'webaudio-player/controls': ['default'],
    'webaudio-player/player': ['default'],
    'webaudio-player/request': ['fetch'],
    'webaudio-player/settings': ['libs', 'configure']
  }
});

module.exports = app.toTree();
