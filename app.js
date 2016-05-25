'use strict';

class Clock {

  run() {
    this.setTimestamp();
    this.displayTimestamp();
  }

  setTimestamp() {
    this.timestamp = Math.round(+new Date()/1000);
  }

  displayTimestamp() {
    $('#timestamp').text(this.timestamp);
    document.title = `Unix Time is ${this.timestamp}`;
  }

}

// makes elements full screen height, width
function fullScreen(element) {
	element.css({
		height: $(window).height()
	});
}

const unixClock = new Clock();

$(function(){
  fullScreen($(".container"));
  $(window).resize(function() {
		fullScreen($(".container"));
	});
  unixClock.run();
  setInterval(function() {
    return unixClock.run();
  },1000);
});
