var $ = require('jquery');
class Common{
    /*
    * Function: injectCSS
    * injectCSS(selector,styleArr1,styleArr2 ... styleArr_n)
    * injectCSS(selector,style1,style2...style_n);
    * injectCSS(selector,styleString);
    * injectCSS(cssString);
    */
    function injectCSS(){
      var styleString = "<style>";
      if(arguments.length === 1){
        styleString += arguments[0];
      }
      else{
        styleString += arguments[0] + "{";
        for(var i = 1; i < arguments.length - 1; i++){
          if(typeof(arguments[i]) === String){
            styleString += arguments[i] + ";";
          }
          if(typeof(arguments[i]) === Array){
            styleString += arguments[i][0] + ":" + arguments[i][1] + ";";
          }
        }
        styleString += "}";
      }
      styleString += "</style>"
      $("head").append(styleString);
    }
    /*
    * Function: injectHTML
    * injectHTML(selector);
    * injectHTML(selector,markupString);
    * injectHTML(selector,type,innerMarkup);
    * injectHTML(... boolean append);
    */
    function injectHTML(){
      var markupString = "";
      var realLength = arguments.length - (typeof(arguments[arguments.length-1]) === Boolean);
      if(realLength === 1){
        markupString = "<div></div>";
      } else if(realLength === 2){
        markupString = arguments[1];
      } else if(realLength === 3){
        markupString = "<" + arguments[1] + ">" + arguments[2] + "</" + arguments[1] + ">";
      } else if(realLength === 4){
        markupString = "<" + arguments[1] + " " + arguments[2] + ">" + arguments[3] + "</" + arguments[1] + ">";
      }
      if(typeof(arguments[arguments.length-1]) === Boolean){
        if(arguments[arguments.length-1]){
          $(arguments[0]).append(markupString);
        } else {
          $(arguments[0]).prepend(markupString);
        }
      }
    }
    /*
    * Function: prettyURL
    * prettyURL(url)
    */
    function prettyURL(url){
      var temp = document.createElement("a");
      temp.href = url;
      url = temp["hostname"];
      $(temp).remove();
      return url;
    }
}
class listener{
  function get(){
    return $(".listener").first();
  }
  function set(target){
    target.addClass("listener");
  }
  function delete( target ){
    $(target).each( function(t){
      $(t).removeClass("listener");
      $(t).prop("search_term", "");
    }
  }
  function reset(){
    this.delete(".listener");
  }
}
class suggestor{
  function get(){
    return $("search_suggestions");
  }
  function create(){
    Common.injectHTML(
      "body",
      "div",
      "id = 'search_suggestions'",
    );
    Common.injectCSS(
      "#search_suggestions",
      {"display","none"},
      {"position","absolute"},
      {"width","250px"},
      {"heigth","10px"},
      {"border","2px solid #000000"},
      {"background-color", "#ffffff"},
    );
    return $("search_suggestions");
  }
  function set(){

  }
  function attach(){
    this.get().css("left",e.offset().left + e.outerWidth());
    this.get().css("top",e.offset().top);
  }
  function hide(){
    this.get().css
  }
  function accept(){

  }
}
// this is only temp, plan on making it more readable soon
exports.run = function(){
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
  )
  Common.injectCSS(
    "#search_suggestions > ol >li:hover",
    {"background-color",  "lightblue"},
    {"cursor",            "pointer"},
  );
  var sb = suggestor.create();

}
