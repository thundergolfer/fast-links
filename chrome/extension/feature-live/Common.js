
/*
* Function: injectCSS
* injectCSS(selector,styleArr1,styleArr2 ... styleArr_n)
* injectCSS(selector,style1,style2...style_n);
* injectCSS(selector,styleString);
* injectCSS(cssString);
*/
exports.injectCSS = function(){
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
exports.injectHTML = function() {
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
exports = Common;
