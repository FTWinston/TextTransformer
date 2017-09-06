import * as React from 'react';
import './SpecialCharacterInput.css';

interface ISpecialCharacterProps {
  singleLine: boolean;
  className?: string;
  defaultValue: string;
  valueChanged: (value: string) => void;
}

export class SpecialCharacterInput extends React.Component<ISpecialCharacterProps, {}> {
  control: HTMLTextAreaElement | HTMLInputElement;

  render() {
    let control = this.props.singleLine
      ? (
        <input
          type="text"
          autoComplete="off"
          className={this.props.className}
          defaultValue={this.props.defaultValue}
          onChange={e => this.props.valueChanged(e.target.value)}
          ref={(el) => { if (el !== null) { this.control = el; }}}
        />
        )
      : (
        <textarea
          className={this.props.className}
          defaultValue={this.props.defaultValue}
          onChange={e => this.props.valueChanged(e.target.value)}
          ref={(el) => { if (el !== null) { this.control = el; }}}
        />
        );

    return (
      <div className="specialCharacters">
        {control}
        <div className="specialCharacters-controls">
          <a href="#" onClick={() => this.apply('	')}>tab</a>
          <a href="#" onClick={() => this.apply('\r')} title="carriage return">cr</a>
          <a href="#" onClick={() => this.apply('\n')} title="line feed">lf</a>
        </div>
      </div>
    );
  }
  private apply(val: string) {
    let cursorPos = this.control.selectionEnd;
    let start = this.control.value.substr(0, cursorPos);
    let end = this.control.value.substr(cursorPos);
    
    this.control.value = start + val + end;
    this.control.selectionStart = this.control.selectionEnd = cursorPos + 1;

    this.control.focus();
  }
}