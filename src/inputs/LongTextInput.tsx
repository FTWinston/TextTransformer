import * as React from 'react';

interface ILongTextProps {
  name: string;
  value: string;
  valueChanged: (value: string) => void;
}

export class LongTextInput extends React.Component<ILongTextProps, {}> {
  render() {
    return (
    <div className="field">
      <label>
        <span className="field-name">{this.props.name}</span>
        <textarea className="field-value" defaultValue={this.props.value} onChange={e => this.props.valueChanged(e.target.value)} />
      </label>
    </div>
    );
  }
}