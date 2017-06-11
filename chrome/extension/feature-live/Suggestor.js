// PseudoClass Suggestor
var Listener = require("Listener.js");
// Suggestor.get()
// Returns the suggestor element
exports.get = function(){
  return $("search_suggestions");
}
/* Suggestor.hide()
*  Hides the suggestor element
*/
exports.hide = function(){
  this.get().removeClass("active");
}
// Suggestor.setup()
// Injects the suggestor html element into the page
// returns the suggestor element
exports.setup = function(){
  Common.injectHTML(
    "body",
    "div",
    "id = 'search_suggestions'",
  );
  return $("search_suggestions");
}
/* Suggestor.attach(document.element: target)
*  Arguments:
*  1: target(DOM element)
*   The element to attach the suggestion box to
*  Attaches the suggestor to a Listener
*/
exports.attach = function(target){
  if(target === null){
    target = Listener.get()
  }
  this.get().css("left", target.offset().left + target.outerWidth());
  this.get().css("top", target.offset().top());
}
/* Suggestor.setContent(array: arr)
*  Arguments:
*  1: arr(array of JSON)
*   An array of all the items to fill the suggestor with.
*  Populates the suggestor with elements
*/
exports.setContent = function(arr){
  if(arr.length === 0){
    this.hide();
  }
  else{
    this.get().addClass("active");
    var html_str = "<ol>";
    arr.sort(function(v1,v2){
      return ((v1.visitCount + v1.typedCount*2) - (v2.visitCount + v2.typedCount*2))
    });
    arr.forEach(function(v){
        html_str += "<li url='" + v.url + "' title='" + v.title +"'>" + nicefyURL(v.url) + " | " + v.title.substring(0,21) + "</li>")
    })

    html_str += "</ol>";
    this.get().html(html_str);
    this.get().find("li").first().addClass("selected");
    this.get().css("height", this.get().children("ol").outerHeight());
  }
}
/*
function accept(){
  var suggestor  = this.get().find("ol > .selected");
  var entry = listener.get();
  if(exports.platform.reddit){
    format = "[" +  +"]"
  }
  t.val(t.val().replace("%" + t.prop("search_value"),
  "[" + (t.prop("search_value").length > 0 ? t.prop("search_value") :s.attr("title")) + "](" + s.attr("url") + ")" ));
  $('textarea').trigger('change');
  stopListening(t);
}
*/
