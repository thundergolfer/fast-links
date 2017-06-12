import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';
/************************************
**        External Modules         **
** TODO: Make the names of all     **
** imported variables more consistent
************************************/

var jQuery,$ = require('jquery');
// Utilities
var place = require('./utilities/place');
var logging = require('./utilities/logging');
// TODO: expand on this code and move to the utilities directory
var utility = require('./utility');

// Code to be exported as we move the platform specific code to external modules.
var nlpAnalyser = require('./entity_recognition');
var popup_linking = require('./popup_linking');

/************************************
**             Tests               **
** TODO: Add testing for more modules
** TODO: Maybe add an if envirnonment
** is not production don't print this
** shit :)
************************************/
place.test();




// TODO: Determine if we actually need this
class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    return (
      <div>
        <button onClick={this.buttonOnClick}>
          Open TodoApp
        </button>
        <Dock
          position="right"
          dimMode="transparent"
          defaultSize={0.4}
          isVisible={this.state.isVisible}
        >
          <iframe
            style={{
              width: '100%',
              height: '100%',
            }}
            frameBorder={0}
            allowTransparency="true"
            src={chrome.extension.getURL(`inject.html?protocol=${location.protocol}`)}
          />
        </Dock>
      </div>
    );
  }
}
// TODO: Figure out if this can be removed (looks like example code)
window.addEventListener('load', () => {
  console.log("Running/Loading FastLinks injector");
  const injectDOM = document.createElement('div');
  injectDOM.className = 'inject-react-example';
  injectDOM.style.textAlign = 'center';
  document.body.appendChild(injectDOM);
  render(<InjectApp />, injectDOM);
});

// TODO: export to external module
var introducePopupLinksCSS = () => {
  $("head").append("<style>ol > .selected{background-color:blue;color:white;cursor:pointer;}</style>")
  $("head").append("<style>#search_suggestions > ol >li:hover{background-color:lightblue;cursor:pointer;}</style>")
  $("head").append("<style>#search_suggestions > ol >li{white-space: nowrap;display:block;overflow: hidden;text-overflow: ellipsis;}</style>")
}
// TODO: export internal components to external module and simplify code
var handleReddit = () => {
  introducePopupLinksCSS();
  popup_linking.createSuggestionBox();

  $("body").click(function(){
    if($("textarea.listening").length > 0){
      $("textarea.listening").each(function(t){popup_linking.stopListening($(t))});
    }
  });

 /**
  * You can't pull out this function it creates a ReferenceError in
  * chrome.extension.onMessage.addListener()
  */
  function setSuggestionItems(arr){
    // Did I do this?, if so I apologise -Avrami
    //console.log(arr);
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
      sb.children("ol").append("<li url='" + v.url + "' title='" + v.title +"'>" + popup_linking.nicefyURL(v.url) + " | " + v.title.substring(0,21) + "</li>");
    });

    $("#search_suggestions > ol > li").click(function(){
      console.log("clicked");
      $(this).parent().children(".selected").removeClass("selected");
      $(this).addClass("selected");
      popup_linking.confirmSuggestionItem();
    })
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
          popup_linking.stopListening(t);
        }
        t.prop("search_value",s.substring(0	,s.length-1));
      }
    }
    else if(e.keyCode === 27){
      popup_linking.stopListening(t);
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
          popup_linking.stopListening(t);
          return;
        }
        t.prop("search_value",s.substring(0	,s.length-1));
      }
      // enter = do it
      else if(e.keyCode === 13){
        popup_linking.confirmSuggestionItem();
        return;

      }
      // space, escape = abort
      else if(e.keyCode === 32 || e.keyCode === 27){
        popup_linking.stopListening(t);
        return;
      }
      // otherwise = add stuff
      else{
        t.prop("search_value", t.prop("search_value") + String.fromCharCode(e.keyCode));
      }
    }
    else if(e.keyCode === 37){
      $(".listening").removeClass("listening");
      popup_linking.attachSuggestionBox(t);
      t.addClass("listening");
      t.prop("search_value","");
    }
    if(t.hasClass("listening")){
      chrome.extension.sendMessage({search_str: t.prop("search_value")});
    }
  }

  $("textarea").keyup(keyUpListener);
  $("textarea").keypress(keyPressListner);


  /* Make is work on 'reply' boxes as well */
  var reply_buttons = document.getElementsByClassName('reply-button');
  for (var i = 0; i < reply_buttons.length; i++) {
    //console.log(reply_buttons[i]);
    reply_buttons[i].onclick = function() {
      var form = $(this).parent().parent().siblings().find('textarea').first();
      $(form).keyup(keyUpListener);
      $(form).keypress(keyPressListner);
      console.log("binding our stuff to a reply button link");
      // find the new textarea
      var save_buttons = document.getElementsByClassName('save');
      for (var j = 0; j < save_buttons.length; j++) {
        var saver = save_buttons[j];
        saver.onclick = function() {
          console.log("a reply save button clicked~!");
          var form = $(this).parent().parent().siblings().find('textarea')[0];
          console.log(form);
          console.log(form.value);
          form.value = nlpAnalyser.nlpDecorator(form.value, "reddit");
        }
      }
    };
  }

  $("head").append("<link href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" rel= \"stylesheet\" integrity= \"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin= \"anonymous\" > ")

  $(".usertext-buttons").append("<a class='fastlink-btn btn btn-default' data-toggle='modal' data-target='#myModal'>FastLink</a>");
  $(".fastlink-btn").click(function (t) {
      $(".flagged").removeClass("flagged");
      $(this).parent().parent().parent().addClass("flagged")
      $("form.form-modal > .form-group > textarea").val(nlpAnalyser.nlpDecorator($(this).parent().parent().parent().children(".md").children("textarea").val(), "reddit"));
  })
  var doSubmitFastLinks = function () {
      $(".flagged").children(".md").children("textarea").val($("form.form-modal > .form-group > textarea").val());
      $("#MyModal").css("display", "none");
  }


  $("body").prepend("<div id='myModal' class='modal fade' tabindex='- 1' role='dialog'> <form class='form form-modal' style='margin: 10px;'> <div class='form-group'><textarea class='form-control' rows='4' cols='5' width='10px'></textarea><input id='modal-submit' class='btn btn-success' data-dismiss='modal' value='Confirm'/></form></div>")
  $("#modal-submit").click(doSubmitFastLinks);
};

var facebookPostBoxClickHandler = () => {
  if (fast_linked) {
    var text_span = document.querySelectorAll('[data-text="true"]')[0];
    text_span.id = "to_highlight";
    utility.selectText("to_highlight");
  } else {
    var post_button = document.querySelectorAll('[data-testid="react-composer-post-button"]')[0];
    // Why did you do this to my console?
    // try to remove debugging console.logs after you are done with them.
    //console.log("post_button");
    //console.log(post_button);
    var parent_div = post_button.parentElement;
    if (!document.getElementById("fastlinks")) {
      var new_button = post_button.cloneNode(true);
      var new_button_inner_span = new_button.getElementsByTagName("span")[0];
      new_button_inner_span.innerHTML = "fastlink";
      parent_div.appendChild(new_button);
      new_button.id = "fastlinks";

      new_button.onclick = function() {
        console.log("Clicked! the fastlink button.");
        var text_span = document.querySelectorAll('[data-text="true"]')[0];
        text_span.innerHTML = nlpAnalyser.nlpDecorator(text_span.innerHTML, "facebook");
        //text_span.innerHTML = "NOW PASTE HERE!";
        text_span.id = 'to_highlight';

        //console.log("COPIED!");
        //utility.copyTextToClipboard(fast_linked);
      }
    }
  }
};

var handleFacebook = () => {
  var post_box = document.getElementById("composer_text_input_box");
  console.log(post_box);

  post_box.onclick = facebookPostBoxClickHandler;
};

window.addEventListener('load', () => {
  // This is never given a value?
  var fast_linked;
  if (place.isReddit()){
    handleReddit();
  }
  if (place.isFacebook()){
    handleFacebook();
  }
  if (place.isDefault()){
    // handleDefault();
  }
});
