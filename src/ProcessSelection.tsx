import * as React from 'react';
import { Button } from './Button';

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
      recordButton = <Button onClick={() => this.props.startRecording()} text="Record new..." />;
    } else if (this.props.isRecording) {
      let steps = this.props.recordedItem.actions.length;
      recordButton = <Button className="recording" onClick={() => this.props.stopRecording()} text={'Stop recording (' + steps + ' steps)'} />;
    } else {
      let dropdownOptions: [[string, () => void]] = [
        ['Run', this.props.startRecording],
        ['Save', this.props.startRecording],
        ['Resume recording', this.props.startRecording],
        ['Clear', this.props.startRecording],
      ];
      recordButton = <Button text="Recorded" dropdown={dropdownOptions} />;
    }

    return (
      <div className="App-processes">
        <div className="App-processList">
          {Process.all.map(function(proc: ISelectable, index: number) {
            let classes = that.props.selectedItem === undefined ? undefined : proc === that.props.selectedItem ? 'active' : 'inactive';
            return <Button key={index} className={classes} onClick={e => that.selectItem(proc)} title={proc.description} text={proc.name} />;
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