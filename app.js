(function() {

  // Determines and sets the timestamp
  var unixClock = {

    run: function() {
      this.setTimestamp();
      this.displayTimestamp();
      this.setInterval();
    },

    setInterval: function() {
      var self = this;
      this.interval = setInterval(function() {
        self.setTimestamp();
        self.displayTimestamp();
      },100);
    },

    clearInterval: function() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },

    setTimestamp: function() {
      this.timestamp = Math.round(+new Date()/1000);
    },

    displayTimestamp: function() {

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
          i * Math.min(400 / difference, 75)
        );

      }

    }

  };

  // UI manager, mainly to fullscreen the container
  var timestampUI = {

    setup: function(element) {
      var self = this;
      this.fullscreen(element);
      $(window).resize(function() {
    		self.fullscreen(element);
    	});
    },

    fullscreen: function(element) {
      return element.css({
    		height: $(window).height()
    	});
    }

  };

  // When ready...
  $(function(){
    timestampUI.setup( $('.container') );
    unixClock.run();
  });

})();
