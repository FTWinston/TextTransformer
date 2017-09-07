import * as React from 'react';

import { ISelectable } from './model/Interfaces';
import { Process } from './model/Process';
import { Queue } from './model/Queue';

import './ProcessSelection.css';

interface ISelectionProps {
  selectedItem?: ISelectable;
  selectItem: (process?: ISelectable) => void;

  startRecording: () => void;
  stopRecording: () => void;
  recordingProcess?: Queue;
}

export class ProcessSelection extends React.Component<ISelectionProps, {}> {
  render() {
    let that = this;

    let recordButton = this.props.recordingProcess === undefined
      ? <button type="button" onClick={() => this.props.startRecording()}>Record new...</button>
      : <button type="button" onClick={() => this.props.stopRecording()}>Save ({this.props.recordingProcess.actions.length})...</button>;

    return (
      <div className="App-processes">
        <div className="App-processList">
          {Process.all.map(function(proc: ISelectable, index: number) {
            let classes = that.props.selectedItem === undefined ? undefined : proc === that.props.selectedItem ? 'active' : 'inactive';
            return <button type="button" key={index} className={classes} onClick={e => that.selectItem(proc)} title={proc.description}>{proc.name}</button>;
          })}
        </div>
        <div className="App-actionButtons">
          {recordButton}
        </div>
      </div>
    );
  }
  private selectItem(item?: ISelectable) {
    if (item === this.props.selectedItem) {
      item = undefined;
    }
    
    this.props.selectItem(item);
  }
}