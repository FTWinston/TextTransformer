import * as React from 'react';

interface INumericProps {
  name: string;
  value?: number;
  valueChanged: (value?: number) => void;
}

export class NumericInput extends React.Component<INumericProps, {}> {
  render() {
    return (
    <div className="field">
      <label>
        <span className="field-name">{this.props.name}</span>

        <input
          type="number"
          autoComplete="off"
          defaultValue={this.props.value === undefined ? '' : this.props.value.toString()}
          onChange={e => this.props.valueChanged(parseInt(e.target.value, 10))}
        />
      </label>
    </div>
    );
  }
}