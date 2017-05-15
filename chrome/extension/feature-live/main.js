var $ = require('jquery');
var Common = require('./Common.js')
var Suggestor = require('./Suggestor.js');
var Listener = require('./Listener.js');
exports.platform.reddit;
exports.platform.facebook;
exports.platform.basic;

function inject_css(){
  Common.injectCSS(
    "#search_suggestions",
    {"display","none"},
    {"position","absolute"},
    {"width","250px"},
    {"heigth","10px"},
    {"border","2px solid #000000"},
    {"background-color", "#ffffff"},
  );
  Common.injectCSS(
    "#search_suggestions.active",
    {"display","block"},
    {"z-index", "5000"}
  );
  Common.injectCSS(
    "ol > .selected",
    {"background-color",  "blue"},
    {"color",             "white"},
    {"cursor",            "pointer"},
  );
  Common.injectCSS(
    "#search_suggestions > ol >li:hover",
    {"white-space",       "nowrap"},
    {"display",           "block"},
    {"overflow",          "hidden"},
    {"text-overflow",     "ellipsis"};
  );
  Common.injectCSS(
    "#search_suggestions > ol >li:hover",
    {"background-color",  "lightblue"},
    {"cursor",            "pointer"},
  );
}


exports.run = function(){
  inject_css();
  var suggestion_box = Suggestor.create();
  var text_listener = Listener.create();

}
