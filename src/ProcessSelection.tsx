import * as React from 'react';
import { Button } from './components/Button';
import { DropdownButton } from './components/DropdownButton';

import { ISelectable } from './model/Interfaces';
import { Process } from './model/Process';
import { Queue } from './model/Queue';

import './ProcessSelection.css';

interface ISelectionProps {
  selectedItem?: ISelectable;
  selectItem: (process?: ISelectable) => void;

  startRecording: () => void;
  stopRecording: () => void;
  clearRecording: () => void;
  runRecording: () => void;
  isRecording: boolean;
  recordedItem?: Queue;
}

interface ISelectionState {
  processes: ISelectable[];
}

export class ProcessSelection extends React.Component<ISelectionProps, ISelectionState> {
  constructor(props: ISelectionProps) {
    super(props);

    this.state = {
      processes: Process.all.slice() as ISelectable[],
    };
  }
  render() {
    let that = this;

    let recordButton: JSX.Element;

    if (this.props.recordedItem === undefined) {
      recordButton = <Button onClick={() => this.props.startRecording()} text="Record..." title="Click to start recording your actions" />;
    } else if (this.props.isRecording) {
      let steps = this.props.recordedItem.actions.length;
      let stepsText = steps === 1 ? steps + ' step' : steps + ' steps';
      recordButton = (
        <Button
          className="recording"
          onClick={() => this.props.stopRecording()}
          text={'Recording (' + steps + ')'}
          title={'Click to stop recording (' + stepsText + ' recorded)'}
        />
      );
    } else {
      let dropdownOptions: [[string, () => void]] = [
        ['Run now', this.props.runRecording],
        ['Save process', () => this.saveRecordedProcess()],
        ['Resume recording', this.props.startRecording],
        ['Clear', this.props.clearRecording],
      ];
      
      let steps = this.props.recordedItem.actions.length;
      recordButton = <DropdownButton text="Recorded" className="recorded" dropdownItems={dropdownOptions} title={'Recorded process has ' + steps + ' steps'} />;
    }

    return (
      <div className="App-processes">
        <div className="App-processList">
          {this.state.processes.map(function(proc: ISelectable, index: number) {
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
  private saveRecordedProcess() {
    if (this.props.recordedItem !== undefined) {
      let newItem = this.props.recordedItem;
      let name = window.prompt('Enter a name for the recorded process', 'New process');
      if (name === null) {
        return;
      }
      
      newItem.name = name;

      this.setState((state: ISelectionState) => {
        state.processes.push(newItem);
      });
    }

    this.props.clearRecording();
  }
}