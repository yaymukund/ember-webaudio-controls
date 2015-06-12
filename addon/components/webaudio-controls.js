import Ember from 'ember';

export default Ember.Component.extend({
  player: null,
  isPaused: false,

  actions: {
    unpause: function() {
      this.get('player').resume();
      this.set('isPaused', false);
    },

    pause: function() {
      this.get('player').pause();
      this.set('isPaused', true);
    },

    seekTo: (seconds) => { console.log(seconds); },
    mute: () => {},
    unmute: () => {},
    setVolume: (volume) => { console.log(volume); }
  }
});
