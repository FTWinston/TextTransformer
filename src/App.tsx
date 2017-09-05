import * as React from 'react';
import './App.css';

import { IAction } from './model/Action';
import { Queue } from './model/Queue';
import { IProcess, Process } from './model/Process';
import { IParameter } from './model/Parameters';

import './processes';

const logo = require('./logo.svg');

interface IAppState {
  showHeader: boolean;
  value: string;
  displayAction?: IAction;
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
    let showHeaderStyle = this.state.showHeader ? {visibility: 'hidden'} : undefined;

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
          <div className="App-actionButtons">
            <button type="button" onClick={() => this.hideHeader()}>Hide header</button>
          </div>
        </div>
        <div className="App-processes">
          <div className="App-processList">
            {this.renderProcessButtons()}
          </div>
          <div className="App-actionButtons">
            <button type="button" onClick={() => this.showHeader()} style={showHeaderStyle}>Show header</button>
          </div>
        </div>
        {this.renderParameters()}
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
  private renderProcessButtons() {
    let selectedProcess = this.state.displayAction === undefined ? undefined : this.state.displayAction.process;
    let app = this;

    return Process.all.map(function(process: IProcess, index: number) {
      let cname = selectedProcess === undefined ? undefined : process === selectedProcess ? 'active' : 'inactive';
      return <button type="button" key={index} className={cname} onClick={e => app.selectProcess(process)}>{process.name}</button>;
    });
  }
  private renderParameters() {
    const parameters = this.state.displayAction === undefined ? undefined : this.state.displayAction.rawParameters;
    if (parameters === undefined) {
      return undefined;
    }

    let paramControls = Object.keys(parameters).map(function (key: string, index: number) {
      let param = parameters[key] as IParameter;
      return param.renderInput(index);
    });

    return (
    <div className="App-parameters">
      <div className="App-parameterList">
        {paramControls}
      </div>
      <div className="App-actionButtons">
        <button type="button" onClick={() => this.runOpenProcess()}>Run process</button>
      </div>
    </div>
    );
  }
  private textChanged(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({value: event.target.value});
  }
  private showHeader() {
    this.setState({showHeader: true});
  }
  private hideHeader() {
    this.setState({showHeader: false});
  }
  private selectProcess(process: IProcess) {
    if (process === undefined || (this.state.displayAction !== undefined && process === this.state.displayAction.process)) {
      this.setState({displayAction: undefined});
      return;
    }
    
    let action = process.createNewAction();
    this.setState({displayAction: action});
  }
  private runOpenProcess() {
    if (this.state.displayAction === undefined) {
      return;
    }

    let queue = new Queue();
    queue.actions.push(this.state.displayAction);
    let output = queue.perform(this.state.value);

    this.setState({
      value: output,
    });
  }
}

export default App;