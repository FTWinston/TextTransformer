import * as React from 'react';
import { IAction } from './model/Action';
import { IParameter } from './model/Parameters';

interface IParamProps {
  action?: IAction;
  runCurrentAction: () => void;
}

export class ParameterDisplay extends React.Component<IParamProps, {}> {
  render() {
    const parameters = this.props.action === undefined ? undefined : this.props.action.rawParameters;
    if (parameters === undefined) {
      return null;
    }

    let paramControls = Object.keys(parameters).map(function (key: string, index: number) {
      let param = parameters[key] as IParameter;
      return param.renderInput(index);
    });

    return (
    <div className="App-parameters">
      <div className="App-parameterList">
        {paramControls}
      </div>
      <div className="App-actionButtons">
        <button type="button" onClick={() => this.props.runCurrentAction()}>Run process</button>
      </div>
    </div>
    );
  }
}