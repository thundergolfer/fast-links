var $ = require('jquery');
var jQuery = $;

var createSuggestionBox =() => {
  $("body").append("<div id='search_suggestions' "+
  "style='display:none;position:absolute;width:250px;height:10px;border:2px solid #000000;background-color:#ffffff;'"+
  "></div>");
};


var attachSuggestionBox = (e) => {
  var sb = $("#search_suggestions");
  sb.css("left",e.offset().left + e.outerWidth());
  sb.css("top",e.offset().top);
};


var stopListening = (t) => {
  t.removeClass("listening");
  t.prop("search_value","");
  $("#search_suggestions").css("display","none");
};


var confirmSuggestionItem = () => {
  var s  = $("#search_suggestions").children("ol").children(".selected");
  var t = $("textarea.listening").first();
  t.val(t.val().replace("%" + t.prop("search_value"),"[" + (t.prop("search_value").length > 0 ? t.prop("search_value") :s.attr("title")) + "](" + s.attr("url") + ")" ));
  $('textarea').trigger('change');
  popup_linking.stopListening(t);
};

var nicefyURL = (url) => {
  var temp = document.createElement("a");
  temp.href = url;
  url = temp["hostname"];
  $(temp).remove();
  return url;
};

module.exports.createSuggestionBox = createSuggestionBox;
module.exports.attachSuggestionBox = attachSuggestionBox;
module.exports.stopListening = stopListening;
module.exports.confirmSuggestionItem = confirmSuggestionItem;
module.exports.nicefyURL = nicefyURL;
