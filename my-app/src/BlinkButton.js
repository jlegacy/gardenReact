import React from 'react';

var ws = new WebSocket('ws://192.168.1.16:3939/public');

ws.onopen = () => {
  // connection opened
  ws.send('something'); // send a message
};

ws.onmessage = (e) => {
  // a message was received
  console.log(e.data);
};

ws.onerror = (e) => {
  // an error occurred
  console.log(e.message);
};

ws.onclose = (e) => {
  // connection closed
  console.log(e.code, e.reason);
};


class BlinkButton extends React.Component {
  constructor(props) {
    super(props);
    this.controlLED = this.controlLED.bind(this, 'on');
  }
  controlLED(node, event) {
	  ws.send(event);
  }
  render() {
    return (
    <div>
    <button onClick={this.controlLED.bind(this, 'on')}>Turn on LED</button>
      <button onClick={this.controlLED.bind(this, 'off')}>Turn off LED</button>
      <button onClick={this.controlLED.bind(this, 'blink')}>Blink LED</button>
    </div>
    );
  }
}

export default BlinkButton;
