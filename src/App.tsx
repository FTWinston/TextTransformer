import * as React from 'react';
import './App.css';
import './Buttons.css';

import { AppHeader } from './AppHeader';
import { ProcessSelection } from './ProcessSelection';
import { ParameterDisplay } from './ParameterDisplay';
import { IAction } from './model/Action';
import { Queue } from './model/Queue';
import { IProcess } from './model/Process';

import './processes';

interface IAppState {
  showHeader: boolean;
  value: string;
  displayAction?: IAction;
}

export class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showHeader: true,
      value: '',
    };
  }
  render() {
    let selectedProcess = this.state.displayAction === undefined ? undefined : this.state.displayAction.process;

    return (
      <div className="App">
        <AppHeader show={this.state.showHeader} hide={() => this.hideHeader()} />
        <ProcessSelection
          showHeader={this.state.showHeader}
          selectedProcess={selectedProcess}
          makeHeaderShow={() => this.showHeader()}
          selectProcess={p => this.selectProcess(p)}
        />
        <ParameterDisplay action={this.state.displayAction} runCurrentAction={() => this.runOpenProcess()} />
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
  private showHeader() {
    this.setState({showHeader: true});
  }
  private hideHeader() {
    this.setState({showHeader: false});
  }
  private selectProcess(process?: IProcess) {
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