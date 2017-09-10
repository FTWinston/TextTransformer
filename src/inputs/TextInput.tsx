import * as React from 'react';
import { SpecialCharacterInput } from '../components/SpecialCharacterInput';

interface ITextProps {
  name: string;
  singleLine: boolean;
  value: string;
  valueChanged: (value: string) => void;
}

export class TextInput extends React.Component<ITextProps, {}> {
  render() {
    return (
    <div className="field">
      <label>
        <span className="field-name">{this.props.name}</span>
        <SpecialCharacterInput
          singleLine={this.props.singleLine}
          className="field-value"
          defaultValue={this.props.value}
          valueChanged={this.props.valueChanged}
        />
      </label>
    </div>
    );
  }
}