import * as React from 'react';

interface IChoiceProps {
  name: string;
  options: string[];
  value: string;
  valueChanged: (value: string) => void;
}

export class ChoiceInput extends React.Component<IChoiceProps, {}> {
  render() {
    let options = this.props.options.map(function (item: string, index: number) {
      return <option key={index} value={item}>{item}</option>;
    });

    return (
    <div className="field">
      <label>
        <span className="field-name">{this.props.name}</span>
        <select defaultValue={this.props.value} onChange={e => this.props.valueChanged(e.target.value)}>
          {options}
        </select>
      </label>
    </div>
    );
  }
}