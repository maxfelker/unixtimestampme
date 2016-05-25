'use strict';

// Determins and sets the timestamp
class Clock {

  run() {
    this.setTimestamp();
    this.displayTimestamp();
    this.setInterval();
  }

  setInterval() {
    const self = this;
    this.interval = setInterval(function() {
      self.setTimestamp();
      self.displayTimestamp();
    },1000);
  }

  setTimestamp() {
    this.timestamp = Math.round(+new Date()/1000);
  }

  displayTimestamp() {
    $('#timestamp').text(this.timestamp);
    document.title = `Unix Time is ${this.timestamp}`;
  }

}

// UI manager, mainly to fullscreen the container
class UI {

  setup(element) {
    const self = this;
    this.fullscreen(element);
    $(window).resize(function() {
  		self.fullscreen(element);
  	});
  }

  fullscreen(element) {
    return element.css({
  		height: $(window).height()
  	});
  }

}

const timestampUI = new UI();
const unixClock = new Clock();

$(function(){

  timestampUI.setup( $(".container") );

  unixClock.run();

  $('#timestamp').mouseenter(function() {
    console.log('mouse');
    clearInterval(unixClock.interval);
  });

  $('#timestamp').mouseleave(function() {
    unixClock.run();
  });

});
