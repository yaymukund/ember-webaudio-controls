import Ember from 'ember';
import { configure } from 'webaudio-player/settings';

export default {
  name: 'webaudio-controls',
  initialize: function() {
    configure({ RSVP: Ember.RSVP });
  }
};
