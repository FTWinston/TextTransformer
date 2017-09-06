import * as React from 'react';

import { IProcess, Process } from './model/Process';
import './ProcessSelection.css';

interface ISelectionProps {
  showHeader: boolean;
  makeHeaderShow: () => void;
  selectedProcess?: IProcess;
  selectProcess: (process?: IProcess) => void;
}

export class ProcessSelection extends React.Component<ISelectionProps, {}> {
  render() {
    let showHeaderStyle = this.props.showHeader ? {visibility: 'hidden'} : undefined;
    let app = this;

    return (
      <div className="App-processes">
        <div className="App-processList">
          {Process.all.map(function(process: IProcess, index: number) {
            let cname = app.props.selectedProcess === undefined ? undefined : process === app.props.selectedProcess ? 'active' : 'inactive';
            return <button type="button" key={index} className={cname} onClick={e => app.selectProcess(process)}>{process.name}</button>;
          })}
        </div>
        <div className="App-actionButtons">
          <button type="button" onClick={() => this.props.makeHeaderShow()} style={showHeaderStyle}>Show header</button>
        </div>
      </div>
    );
  }
  private selectProcess(process: IProcess) {
    if (process === undefined || (this.props.selectedProcess !== undefined && process === this.props.selectedProcess)) {
      this.props.selectProcess(undefined);
      return;
    }
    
    this.props.selectProcess(process);
  }
}