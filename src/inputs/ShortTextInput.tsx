import * as React from 'react';

interface IShortTextProps {
  name: string;
  value: string;
  valueChanged: (value: string) => void;
}

export class ShortTextInput extends React.Component<IShortTextProps, {}> {
  render() {
    return (
    <div className="field">
      <label>
        <span>{this.props.name}</span>
        <input type="text" autoComplete="off" className="value" defaultValue={this.props.value} onChange={e => this.props.valueChanged(e.target.value)} />
      </label>
    </div>
    );
  }
}