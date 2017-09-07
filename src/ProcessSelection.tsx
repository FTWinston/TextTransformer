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
  isRecording: boolean;
  recordedItem?: Queue;
}

export class ProcessSelection extends React.Component<ISelectionProps, {}> {
  render() {
    let that = this;

    let recordButton: JSX.Element;

    if (this.props.recordedItem === undefined) {
      recordButton = <button type="button" onClick={() => this.props.startRecording()}>Record new...</button>;
    } else if (this.props.isRecording) {
      let steps = this.props.recordedItem.actions.length;
      recordButton = <button type="button" className="recording" onClick={() => this.props.stopRecording()}>Stop recording ({steps} steps)</button>;
    } else {
      recordButton = <button type="button">Recorded item</button>; // TODO: show dropdown action list ... resume recording, run, save, clear
    }

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