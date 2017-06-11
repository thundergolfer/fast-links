
function confirmSuggestionItem(){
  var s  = $("#search_suggestions").children("ol").children(".selected");
  var t = $("textarea.listening").first();
  t.val(t.val().replace("%" + t.prop("search_value"),"[" + (t.prop("search_value").length > 0 ? t.prop("search_value") :s.attr("title")) + "](" + s.attr("url") + ")" ));
  $('textarea').trigger('change');
  stopListening(t);
}


function setSuggestionItems(arr){
  console.log(arr);
  var sb = $("#search_suggestions");
  if(arr.length === 0){
    sb.css("display","none");
    return;
  }
  sb.css("display","block");
  sb.css("z-index",5000)
  sb.html("<ol></ol>");
  arr.sort(function(v1,v2){return ((v1.visitCount + v1.typedCount*2) - (v2.visitCount + v2.typedCount*2))});
  arr.forEach(function(v){
    sb.children("ol").append("<li url='" + v.url + "' title='" + v.title +"'>" + nicefyURL(v.url) + " | " + v.title.substring(0,21) + "</li>");
  });
  $("#search_suggestions > ol > li").click(function(){
    console.log("clicked");
    $(this).parent().children(".selected").removeClass("selected");
    $(this).addClass("selected");
    confirmSuggestionItem();
  })
  console.log(sb.children("ol").children());
  sb.css("height", sb.children("ol").outerHeight());
  sb.children("ol").children("li").first().addClass("selected");
}

chrome.extension.onMessage.addListener(function(message){
  setSuggestionItems(message);
})

// Some keys don't get caught with keypress, put them here.
var keyUpListener = function(e){
  var t = $(this);
  if(t.hasClass("listening")){
    var s = t.prop("search_value");
    // backspace = remove stuff
    if(e.keyCode === 8 || e.keyCode === 46){
      if(s.length === 0){
        stopListening(t);
      }
      t.prop("search_value",s.substring(0	,s.length-1));
    }
  }
  else if(e.keyCode === 27){
    stopListening(t);
  }
  else if(e.keyCode === 9){
    var temp = t.children("ol").children("li.selected").next();
    t.children("ol").children("li.selected").removeClass("selected");
    temp.addClass("selected");
  }
}


var keyPressListner = function(e){
  var t = $(this);
  if(t.hasClass("listening")){
    var s = t.prop("search_value");
    // backspace = remove stuff
    if(e.keyCode === 8 || e.keyCode === 46){
      if(s.length === 0){
        stopListening(t);
        return;
      }
      t.prop("search_value",s.substring(0	,s.length-1));
    }
    // enter = do it
    else if(e.keyCode === 13){
      confirmSuggestionItem();
      return;

    }
    // space, escape = abort
    else if(e.keyCode === 32 || e.keyCode === 27){
      stopListening(t);
      return;
    }
    // otherwise = add stuff
    else{
      t.prop("search_value", t.prop("search_value") + String.fromCharCode(e.keyCode));
    }
  }
  else if(e.keyCode === 37){
    $(".listening").removeClass("listening");
    attachSuggestionBox(t);
    t.addClass("listening");
    t.prop("search_value","");
  }
  if(t.hasClass("listening")){
    chrome.extension.sendMessage({search_str: t.prop("search_value")});
  }
}

$("textarea").keyup(keyUpListener);
$("textarea").keypress(keyPressListner);
