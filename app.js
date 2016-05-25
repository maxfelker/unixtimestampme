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
    },100);
  }

  clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  setTimestamp() {
    this.timestamp = Math.round(+new Date()/1000);
  }

  displayTimestamp() {

    var self = this;

    var setTime = function(timestamp) {
      $('#timestamp').text(timestamp);
      document.title = 'Unix Time is ' + timestamp;
    };

    var displayedNode = $('#timestamp').contents()[0];

    if (!displayedNode) {
      return setTime(this.timestamp);
    }

    var selection = window.getSelection();

    if (!selection.isCollapsed && displayedNode === selection.anchorNode) {
      return;
    }

    var displayedTime = parseInt(displayedNode.nodeValue);
    var difference = this.timestamp - displayedTime;

    if (difference < 2) {
      return setTime(this.timestamp);
    }

    // Stop counting, let us catch-up
    this.clearInterval();

    for (var i = 0; i < difference; i++) {

      setTimeout(
        function(step) {

          setTime(displayedTime + step + 1);

          // Done catching up, continue counting
          if (step === difference - 1) {
            self.setInterval();
          }

        }.bind(null, i),
        i * Math.min(400 / difference, 750)
      );

    }

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
});
