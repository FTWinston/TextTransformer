import * as React from 'react';
import { Button } from './components/Button';
import { DropdownButton } from './components/DropdownButton';

import { IProcess, ISelectable } from './model/Interfaces';
import { Process } from './model/Process';
import { Action } from './model/Action';
import { Queue } from './model/Queue';
import { TextParameter, ChoiceParameter, BooleanParameter } from './model/Parameters';

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

interface ISavedProcess {
  name: string;
  fixed: boolean;
}

interface ISavedQueue {
  name: string;
  desc: string;
  actions: {
    process: string;
    params: { [key: string]: string | number | boolean };
  }[];
}

export class ProcessSelection extends React.Component<ISelectionProps, ISelectionState> {
  private static loadSavedProcesses(): ISelectable[] | null {
    let strProcesses = localStorage.getItem('processes');
    if (strProcesses === null) {
      return null;
    }

    // prepare a name lookup
    let allProcesses: { [key: string]: IProcess | undefined} = { };
    for (let process of Process.all) {
      allProcesses[process.name] = process;
    }

    let rawProcesses = JSON.parse(strProcesses) as ISavedProcess[];
    let processes: ISelectable[] = [];

    for (let rawProcess of rawProcesses) {
      if (rawProcess.fixed) {
        let process = allProcesses[rawProcess.name];
        if (process === undefined) {
          throw 'Invalid process name: ' + rawProcess.name;
        }

        processes.push(process);
        continue;
      }

      let userProcess = ProcessSelection.readQueue(allProcesses, rawProcess as object as ISavedQueue);
      processes.push(userProcess);
    }

    return processes;
  }

  private static saveProcesses(processes: ISelectable[]) {
    localStorage.setItem('processes', JSON.stringify(processes));
  }

  private static readQueue(allProcesses: { [key: string]: IProcess | undefined}, rawQueue: ISavedQueue): Queue {
    let queue = new Queue(rawQueue.name);
    queue.description = rawQueue.desc;

    for (let rawAction of rawQueue.actions) {
      let process = allProcesses[rawAction.process] as Process<{}>;
      if (process === undefined) {
        // TODO: this ought to allow "nesting" custom processes within each other. It doesn't.
        throw `Invalid process name in custom process: ${rawAction.process}`;
      }

      let params = process.createParameters();

      let action = new Action<typeof params>(process, params);

      for (let paramName in rawAction.params) {
        if (params.hasOwnProperty(paramName)) {
          let param = params[paramName];
          let rawValue = rawAction.params[paramName];

          if (param instanceof TextParameter && typeof rawValue === 'string') {
            (param as TextParameter).fromJSON(rawValue as string);
          } else if (param instanceof ChoiceParameter && typeof rawValue === 'string') {
            (param as ChoiceParameter).fromJSON(rawValue as string);
          } else if (param instanceof BooleanParameter && typeof rawValue === 'boolean') {
            (param as BooleanParameter).fromJSON(rawValue as boolean);
          } else {
            throw `Invalid parameter type for ${process.name} process: ${paramName} is ${typeof param} / ${typeof rawValue}`;
          }
        } else {
          throw `Invalid parameter name for ${process.name} process: ${paramName}`;
        }
      }
      queue.actions.push(action);
    }
    return queue;
  }

  constructor(props: ISelectionProps) {
    super(props);

    this.state = {
      processes: ProcessSelection.loadSavedProcesses() || Process.all.slice(),
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
          <Button text="Customize" title="Configure the available processes" />
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
      let name = window.prompt('Enter a name for the recorded process', 'New process');
      if (name === null) {
        return;
      }

      let newItem = this.props.recordedItem;
      newItem.name = name;

      this.setState((state: ISelectionState) => {
        state.processes.push(newItem);
        ProcessSelection.saveProcesses(state.processes);
      });
    }

    this.props.clearRecording();
  }
}