import * as React from 'react';
import './App.css';

import Process from './model/Process';
import Parameter from './model/parameters/Parameter';

import Replace from './processes/Replace';
import PrefixSuffix from './processes/PrefixSuffix';
Replace.doNothing(); // without this use of the class, presumably Replace.ts isn't packaged and Process.all.push(new Replace()); in that file does nothing
new PrefixSuffix();

const logo = require('./logo.svg');

interface IAppState {
  showHeader: boolean;
  value: string;
  displayProcess?: Process;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showHeader: true,
      value: '',
    };
  }
  render() {
    let headerClass = this.state.showHeader ? 'App-header' : 'App-header__hidden';
    let selectedProcess = this.state.displayProcess;
    let app = this;
    let processes = Process.all.map(function(process: Process, index: number) {
      let cname = process === selectedProcess ? 'active' : undefined;
      return <button type="button" key={index} className={cname} onClick={e => app.selectProcess(process)}>{process.name}</button>;
    });

    let parameters = this.state.displayProcess === undefined ? undefined : (
    <div className="App-parameters">
      {this.state.displayProcess.parameters.map(function (param: Parameter, index: number) {
        return param.renderInput(index);
      })}
    </div>
    );

    return (
      <div className="App">
        <div className={headerClass} hidden={!this.state.showHeader}>
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-header-content">
            <h2 className="App-title">Text Transformer</h2>
            <p>
              Easily manipulate, edit and transform text.
              Queue up processes consisting of multiple steps, and save them for later.
              Everything's handled in your browser, without sending it over the web.
            </p>
          </div>
          <button type="button" className="App-header-hide" onClick={() => this.hideHeader()}>Hide header</button>
        </div>
        <div className="App-toolbar">
          {processes}
        </div>
        {parameters}
        <textarea
          className="App-text"
          autoComplete="off"
          autoFocus={true}
          placeholder="Enter your text here..."
          value={this.state.value}
          onChange={e => this.textChanged(e)}
        />
      </div>
    );
  }
  private textChanged(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({value: event.target.value});
  }
  /*
  private showHeader() {
    this.setState({showHeader: true});
  }
  */
  private hideHeader() {
    this.setState({showHeader: false});
  }
  private selectProcess(process: Process) {
    this.setState({displayProcess: process === this.state.displayProcess ? undefined : process});
  }
}

export default App;