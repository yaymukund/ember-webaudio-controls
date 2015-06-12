import Ember from 'ember';

// Given an event object, find how far into the <progress> the user clicked.
// For example, if the progress bar were:
//
//    ==========
//
// and the user clicked halfway:
//
//    ==========
//         |
//
// `_getPercentClicked(e)` would return 0.5;
let _getPercentClicked = function(e) {
  return (e.pageX - e.target.offsetLeft) / e.target.offsetWidth;
};

// http://stackoverflow.com/a/6313008
let _formatTime = function(s) {
  let sec_num = parseInt(s, 10); // don't forget the second param
  let minutes = Math.floor(sec_num / 60);
  let seconds = sec_num - (minutes * 60);

  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}

  return `${minutes}:${seconds}`;
};

export default Ember.Component.extend({
  classNames: ['webaudio-controls'],
  player: null,
  isPaused: false,
  seconds: null,
  duration: null,

  formattedSeconds: Ember.computed('seconds', function() {
    return _formatTime(this.get('seconds'));
  }),

  formattedDuration: Ember.computed('duration', function() {
    return _formatTime(this.get('duration'));
  }),

  poll: Ember.on('init', function() {
    if (this.get('isDestroyed')) {
      return;
    }

    let player = this.get('player'),
        duration = player.getDuration(),
        seconds = player.getSeconds();

    this.set('seconds', seconds);
    this.set('duration', duration);

    Ember.run.later(this, 'poll', 200);
  }),

  _bindSeekHandler: Ember.on('didInsertElement', function() {
    this.$('progress').on('click', e => {
      let percent = _getPercentClicked(e);
      this.seek(percent);
    });
  }),

  seek: function(percent) {
    this.get('player').seekToPercent(percent);
  },

  actions: {
    unpause: function() {
      this.get('player').resume();
      this.set('isPaused', false);
    },

    pause: function() {
      this.get('player').pause();
      this.set('isPaused', true);
    },

    mute: () => {},
    unmute: () => {},
    setVolume: (volume) => { console.log(volume); }
  }
});
