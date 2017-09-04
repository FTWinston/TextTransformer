import * as React from 'react';
import './App.css';

const logo = require('./logo.svg');

interface IAppState {
  showHeader: boolean;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showHeader: true,
    };
  }
  render() {
    let headerClass = this.state.showHeader ? 'App-header' : 'App-header__hidden';
    return (
      <div className="App">
        <div className={headerClass} hidden={!this.state.showHeader}>
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-header-content">
            <h2 className="App-title">Text Transformer</h2>
            <p>
              Easily manipulate, edit and transform text.
              Queue up processes consisting of multiple steps, and save them for later.
              Everything stays on your local machine.
            </p>
          </div>
          <button type="button" className="App-header-hide" onClick={() => this.hideHeader()}>Hide header</button>
        </div>
        <div className="App-toolbar">
          Various tools should be shown here.
        </div>
        <textarea className="App-text" autoComplete="off" autoFocus={true} placeholder="Enter your text here..." />
      </div>
    );
  }
  showHeader() {
    this.setState({
      showHeader: true,
    });
  }
  hideHeader() {
    this.setState({
      showHeader: false,
    });
  }
}

export default App;
