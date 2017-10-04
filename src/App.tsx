import * as React from 'react';
import './App.css';

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
  recordedExecutable?: Queue;
  recording: boolean;
}

export class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showHeader: true,
      value: '',
      recording: false,
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
          isRecording={this.state.recording}
          recordedItem={this.state.recordedExecutable}
          startRecording={() => this.startRecording()}
          stopRecording={() => this.stopRecording()}
          clearRecording={() => this.clearRecording()}
          runRecording={() => this.runRecordedExecutable()}
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

    if (this.state.recordedExecutable !== undefined) {
      this.state.recordedExecutable.actions.push(this.state.displayExecutable);
    }

    let runNow = new Queue();
    runNow.actions.push(this.state.displayExecutable);
    let output = runNow.perform(this.state.value);

    // recreate the current executable, so that the recording queue definitely adds a new item next time, and not the same one again
    let cloneExecutable = this.state.displayExecutable.selectedItem.makeExecutable();

    this.setState({
      value: output,
      displayExecutable: cloneExecutable,
    });
  }
  private startRecording() {
    let recordItem = this.state.recordedExecutable;
    if (recordItem === undefined) {
      recordItem = new Queue();
    }

    this.setState({
      recordedExecutable: recordItem,
      recording: true,
    });
  }
  private stopRecording() {
    let recordItem = this.state.recordedExecutable;
    if (recordItem === undefined || recordItem.actions.length === 0) {
      recordItem = undefined;
    }

    this.setState({
      recording: false,
      recordedExecutable: recordItem,
    });
  }
  private clearRecording() {
    this.setState({
      recording: false,
      recordedExecutable: undefined,
    });
  }
  private runRecordedExecutable() {
    let queue = this.state.recordedExecutable;
    if (queue === undefined) {
      return;
    }

    queue.perform(this.state.value);
  }
}