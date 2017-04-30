var $ = require('jquery');
var jQuery = $;

jQuery.fn.extend({
    live: function (event, callback) {
       if (this.selector) {
            jQuery(document).on(event, this.selector, callback);
        }
    }
});

/**
* @name             Elastic+
* @descripton       grow and shrink your textareas automatically
*
* @author           Casey W. Stark
* @author-email     casey@thestarkeffect.com
* @author-website   http://thestarkeffect.com
*
* @license           MIT License - http://www.opensource.org/licenses/mit-license.php
*
* the original by:
* @author           Jan Jarfalk
* @author-email     jan.jarfalk@unwrongest.com
* @author-website   http://www.unwrongest.com
*/

(function($){
  $.fn.elastic = function(options) {
    // We will create a div clone of the textarea
    // by copying these attributes from the textarea to the div.
    var mimics = [
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'fontSize',
      'lineHeight',
      'fontFamily',
      'width',
      'fontWeight',
      'textIndent'];

    // support multiple elements
    if (this.length > 1) {
      this.each(function() {
        // textareas only
        if (this.type != 'textarea') return false;
        $(this).elastic()
      });
      return this;
    }

    // cache the textarea jquery object
    var textarea = this;
    var twin = $('<div></div>').css({
      'position': 'absolute',
      'display': 'none',
      'word-wrap': 'break-word'
    });
    var lineHeight = parseInt(textarea.css('line-height'), 10) || parseInt(textarea.css('font-size'), 10);
    var minHeight = parseInt(textarea.css('height'), 10) || lineHeight * 2;
    var maxHeight = parseInt(textarea.css('max-height'), 10) || Number.MAX_VALUE;
    var goalHeight = 0;
    var i = 0;

    // Opera returns max-height of -1 if not set
    if (maxHeight < 0) { maxHeight = Number.MAX_VALUE; }

    // Append the twin to the DOM
    // We are going to meassure the height of this, not the textarea.
    twin.appendTo(this.parent());

    // Copy the essential styles (mimics) from the textarea to the twin
    var i = mimics.length;
    while (i--) {
      twin.css(mimics[i].toString(), textarea.css(mimics[i].toString()));
    }

    // Sets a given height and overflow state on the textarea
    function setHeightAndOverflow(height, overflow) {
      var curratedHeight = Math.floor(parseInt(height,10));
      if (textarea.height() != curratedHeight) {
        textarea.css({'height': curratedHeight + 'px', 'overflow': overflow});
      }
    }

    // This function will update the height of the textarea if necessary
    this.resize = function(options) {
      // need to update the lineheight if not set
      if (!lineHeight) {
        lineHeight = parseInt(textarea.css('line-height'), 10);
      }

      // set width to get proper height (width could change)
      twin.width(textarea.width());

      // Get curated content from the textarea.
      var textareaContent = textarea.val().replace(/&/g,'&amp;').replace(/  /g, '&nbsp;').replace(/<|>/g, '&gt;').replace(/\n/g, '<br />');

      var twinContent = twin.html();

      if (textareaContent + '&nbsp;' != twinContent) {
        // Add an extra white space so new rows are added when you are at the end of a row.
        twin.html(textareaContent + '&nbsp;');

        // Change textarea height if twin plus the height of one line differs more than 3 pixel from textarea height
        if (Math.abs(twin.height() - textarea.height()) > 3) {
          var goalHeight = twin.height();
          if (goalHeight >= maxHeight) {
            setHeightAndOverflow(maxHeight, 'auto');
          }
          else if(goalHeight <= minHeight) {
            setHeightAndOverflow(minHeight, 'hidden');
          }
          else {
            setHeightAndOverflow(goalHeight, 'hidden');
          }
        }
      }

      return textarea;
    };

    // Hide scrollbars
    textarea.css({'overflow': 'hidden'});

    // Update textarea size on keyup
    textarea.keyup(function() { textarea.resize(); });

    // And this line is to catch the browser paste event
    textarea.on('input paste', function(e){ setTimeout(textarea.resize, 250); });

    // Run resize once when elastic is initialized and return the textarea for chaining
    return this.resize();
  };
})(jQuery);
