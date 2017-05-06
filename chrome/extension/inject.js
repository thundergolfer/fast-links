import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';

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

function deepest (subMenu, select) {
  return [].slice.call (subMenu).reduce (
    function (deepest, el) {
      for (var d = 0, e = el; e !== subMenu; d++, e = e.parentNode);
      return d > deepest.d ? {d: d, el: el} : deepest;
    }, {d: 0, el: subMenu}).el;
};

window.addEventListener('load', () => {
  console.log("Adding Inject component");
  const injectDOM = document.createElement('div');
  injectDOM.className = 'inject-react-example';
  injectDOM.style.textAlign = 'center';
  document.body.appendChild(injectDOM);
  render(<InjectApp />, injectDOM);
});

window.addEventListener('load', () => {
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
    var buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
      var button  = buttons[i];
      if (button.getAttribute('type') === 'submit') {
        console.log(button);
        button.onclick = function() {
          console.log("Pippets");
          console.log(this);
          var form = $(this).parent().parent().siblings().find('textarea')[0];
          console.log(form);
          console.log(form.value);
          form.value = form.value + "I added this ok?";
        }
      }
    }
  } else if (allowedURLs.facebook.test(tab_url)) {
    console.log("We're on Facebook.")
    var post_box = document.getElementById("composer_text_input_box");
    console.log(post_box);

    post_box.onclick = function () {
      var post_button = document.querySelectorAll('[data-testid="react-composer-post-button"]')[0];
      console.log("post_button");
      console.log(post_button);
      post_button.onclick = function() {
        console.log("Clicked! the post button.");
        console.log(post_box.textContent);
        var text_span = document.querySelectorAll('[data-text="true"]')[0];
        console.log(text_span.innerHTML);
      }
    }
  }
});
