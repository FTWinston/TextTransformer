import * as React from 'react';

interface ICheckboxProps {
  name: string;
  value: boolean;
  valueChanged: (value: boolean) => void;
}

export class CheckboxInput extends React.Component<ICheckboxProps, {}> {
  render() {
    return (
    <div className="field">
      <label>
        <span className="field-name">{this.props.name}</span>
        <input type="checkbox" className="field-value" defaultChecked={this.props.value} onChange={e => this.props.valueChanged(e.target.checked)} />
      </label>
    </div>
    );
  }
}