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
//
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
  seconds: null,
  duration: null,

  isPaused: Ember.computed(function() {
    return this.get('player').isPaused();
  }).volatile(),

  volume: Ember.computed(function() {
    return this.get('player').getVolume();
  }).volatile(),

  isMuted: Ember.computed.equal('volume', 0),

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

  seek(percent) {
    this.get('player').seekToPercent(percent);
  },

  actions: {
    seek(event) {
      let percent = _getPercentClicked(e);
      this.seek(percent);
    },

    setVolume(event) {
      let percent = _getPercentClicked(event);

      if (percent > 0.9) {
        percent = 1;
      } else if (percent < 0.1) {
        percent = 0;
      }

      this.get('player').setVolume(percent);
      this.notifyPropertyChange('volume');
    },

    unpause() {
      this.get('player').unpause();
      this.notifyPropertyChange('isPaused');
    },

    pause() {
      this.get('player').pause();
      this.notifyPropertyChange('isPaused');
    },

    mute() {
      this.get('player').mute();
      this.notifyPropertyChange('isMuted');
    },

    unmute() {
      this.get('player').unmute();
      this.notifyPropertyChange('isMuted');
    }
  }
});
