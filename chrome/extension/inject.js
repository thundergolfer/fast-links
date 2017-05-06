import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';
//import nlpDecorator from './entity_recognition';
var nlpAnalyser = require('./entity_recognition');
var $ = require('jquery');
var jQuery = $;

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

console.log("Hello from inject.js");

function selectText(element) {
    var doc = document
        , text = doc.getElementById(element)
        , range, selection
        ;

    console.log(text); console.log("heyeyeye");
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");

    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';


    textArea.value = text;

    document.body.appendChild(textArea);
    console.log(textArea.value);
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
}


window.addEventListener('load', () => {
    console.log("Adding Inject component");
    const injectDOM = document.createElement('div');
    injectDOM.className = 'inject-react-example';
    injectDOM.style.textAlign = 'center';
    document.body.appendChild(injectDOM);
    render(<InjectApp />, injectDOM);
});

window.addEventListener('load', () => {

    var fast_linked;

    console.log("Executing block to handle comment intercept");

    const allowedURLs = {
        reddit: /^https:\/\/www.reddit\.com/,
        github: /^https:\/\/github\.com/,
        facebook: /facebook\.com/
    };
    var tab_url = window.location.href;
    console.log(tab_url);

    if (allowedURLs.reddit.test(tab_url)) {
        console.log("We're on Reddit");
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
        

        $("body").prepend("<div id='myModal' class='modal fade' tabindex='- 1' role='dialog'> <form class='form form-modal' style='margin: 10px;'> <div class='form-group'><textarea class='form-control' rows='4' cols='5' width='10px'></textarea><input id='modal-submit' class='btn btn-success' value='Confirm'/></form></div>")
        $("#modal-submit").click(doSubmitFastLinks);
    } else if (allowedURLs.facebook.test(tab_url)) {
        console.log("We're on Facebook.")
        var post_box = document.getElementById("composer_text_input_box");
        console.log(post_box);

        post_box.onclick = function () {

            if (fast_linked) {
                var text_span = document.querySelectorAll('[data-text="true"]')[0];
                text_span.id = "to_highlight";
                selectText("to_highlight");
            } else {
                var post_button = document.querySelectorAll('[data-testid="react-composer-post-button"]')[0];
                console.log("post_button");
                console.log(post_button);
                var parent_div = post_button.parentElement;
                if (!document.getElementById("fastlinks")) {
                    console.log("element doesn't exist");
                    var new_button = post_button.cloneNode(true);
                    console.log(new_button);
                    var new_button_inner_span = new_button.getElementsByTagName("span")[0];
                    new_button_inner_span.innerHTML = "fastlink";
                    console.log("new button");
                    console.log(new_button);
                    parent_div.appendChild(new_button);

                    new_button.id = "fastlinks";


                    new_button.onclick = function () {
                        console.log("Clicked! the fastlink button.");
                        // debugger;
                        console.log(post_box.textContent);
                        var text_span = document.querySelectorAll('[data-text="true"]')[0];
                        console.log(text_span.innerHTML);

                        text_span.innerHTML = nlpAnalyser.nlpDecorator(text_span.innerHTML, "facebook");
                        console.log(fast_linked);
                        //text_span.innerHTML = "NOW PASTE HERE!";
                        text_span.id = 'to_highlight';

                        //console.log("COPIED!");
                        //copyTextToClipboard(fast_linked);
                    }
                }
            }
        }
    }
});