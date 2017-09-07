import * as React from 'react';
import './App.css';
import './Buttons.css';

import { AppHeader } from './AppHeader';
import { ProcessSelection } from './ProcessSelection';
import { ParameterDisplay } from './ParameterDisplay';
import { IExecutable, ISelectable } from './model/Interfaces';
import { Queue } from './model/Queue';

import './processes';

interface IAppState {
  showHeader: boolean;
  value: string;
  displayExecutable?: IExecutable;
  recording?: Queue;
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
    let selectedItem = this.state.displayExecutable === undefined ? undefined : this.state.displayExecutable.selectedItem;

    return (
      <div className="App">
        <AppHeader show={this.state.showHeader} hide={() => this.hideHeader()} />
        <ProcessSelection
          selectedItem={selectedItem}
          selectItem={p => this.selectProcess(p)}
          recordingProcess={this.state.recording}
          startRecording={() => this.startRecording()}
          stopRecording={() => this.stopRecording()}
        />
        <ParameterDisplay
          executable={this.state.displayExecutable}
          runCurrentAction={() => this.runOpenProcess()}
        />
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
  private hideHeader() {
    this.setState({showHeader: false});
  }
  private selectProcess(process?: ISelectable) {
    if (process === undefined) {
      this.setState({displayExecutable: undefined});
      return;
    }
    let executable = process.makeExecutable();
    this.setState({displayExecutable: executable});
  }
  private runOpenProcess() {
    if (this.state.displayExecutable === undefined) {
      return;
    }

    if (this.state.recording !== undefined) {
      this.state.recording.actions.push(this.state.displayExecutable);
    }

    let runNow = new Queue();
    runNow.actions.push(this.state.displayExecutable);
    let output = runNow.perform(this.state.value);

    this.setState({
      value: output,
    });
  }
  private startRecording() {
    this.setState({
      recording: new Queue(),
    });
  }
  private stopRecording() {
    let queue = this.state.recording;
    if (queue !== undefined) {
      // TODO: do something with this.state.recording queue
    }

    this.setState({
      recording: undefined,
    });
  }
}