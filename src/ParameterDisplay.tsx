import * as React from 'react';
import { Button } from './components/Button';
import { IExecutable, IParameter } from './model/Interfaces';
import './ParameterDisplay.css';

interface IParamProps {
  executable?: IExecutable;
  runCurrentAction: () => void;
}

export class ParameterDisplay extends React.Component<IParamProps, {}> {
  render() {
    const parameters = this.props.executable === undefined ? undefined : this.props.executable.rawParameters;
    if (parameters === undefined) {
      return null;
    }

    // TODO: move this into the Action class?
    let paramControls = Object.keys(parameters).map(function (key: string, index: number) {
      let param = parameters[key] as IParameter;
      return param.renderInput(index);
    });

    return (
    <div className="App-parameters">
      <div className="App-parameters-listWrapper">
        <div className="App-parameters-list">
          {paramControls}
        </div>
      </div>
      <div className="App-actionButtons">
        <Button onClick={() => this.props.runCurrentAction()} text="Run process" />
      </div>
    </div>
    );
  }
}