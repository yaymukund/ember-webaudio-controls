/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-webaudio-controls',
  included: function(app) {
    this._super.included(app);

    app.import('bower_components/webaudio-player/dist/webaudio-player.js', {
      exports: {
        'webaudio-player/cache': ['default'],
        'webaudio-player/controls': ['default'],
        'webaudio-player/player': ['default'],
        'webaudio-player/request': ['fetch'],
        'webaudio-player/settings': ['libs', 'configure']
      }
    });

    app.import('bower_components/octicons/octicons/octicons.css');
    app.import('bower_components/octicons/octicons/octicons.woff', {
      destDir: 'assets'
    });
  }
};
