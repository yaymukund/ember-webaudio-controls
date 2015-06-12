import Ember from 'ember';
import Player from 'webaudio-player/player';

export default Ember.Route.extend({
  setupController: function(controller) {
    let player = new Player();
    controller.set('player', player);
    player.play('test.mp3');
  }
});
