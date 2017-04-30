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

window.addEventListener('load', () => {
  console.log("Adding Inject component");
  const injectDOM = document.createElement('div');
  injectDOM.className = 'inject-react-example';
  injectDOM.style.textAlign = 'center';
  document.body.appendChild(injectDOM);
  render(<InjectApp />, injectDOM);
});

window.addEventListener('load', () => {
  console.log("Executing block to handle comment formsdata");
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
});
