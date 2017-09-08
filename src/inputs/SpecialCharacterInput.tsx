import * as React from 'react';
import './SpecialCharacterInput.css';
import '../Dropdown.css';

interface ISpecialCharacterProps {
  singleLine: boolean;
  className?: string;
  defaultValue: string;
  valueChanged: (value: string) => void;
}

interface ISpecialCharacterState {
  showingDropdown: boolean;
}

export class SpecialCharacterInput extends React.Component<ISpecialCharacterProps, ISpecialCharacterState> {
  private control: HTMLTextAreaElement | HTMLInputElement;
  private dropdown: HTMLDivElement | null;
  private closeTimeout: number | null;

  constructor(props: ISpecialCharacterProps) {
    super(props);

    this.dropdown = null;
    this.closeTimeout = null;

    this.state = {
      showingDropdown: false,
    };
  }
  
  componentDidUpdate(prevProps: ISpecialCharacterProps, prevState: ISpecialCharacterState) {
    if (this.dropdown !== null) {
      this.dropdown.focus();
    }
  }

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

    let dropperClasses = this.state.showingDropdown ? 'specialCharacters-dropper specialCharacters-dropper_open' : 'specialCharacters-dropper';
    let dropper = (
      <button
        type="button"
        className={dropperClasses}
        onClick={() => this.toggleDropdown()}
        onFocusCapture={() => this.focusDropdown()}
      >
        &#9660;
      </button>
    );

    let dropdown = this.state.showingDropdown ? (
    <div
      className="dropdown"
      tabIndex={-1}
      ref={el => this.dropdown = el}
      onFocusCapture={e => this.focusDropdown()}
      onBlurCapture={e => this.blurDropdown()}
    >
      <button type="button" onClick={() => this.apply('	')}>tab</button>
      <button type="button" onClick={() => this.apply('\r')} title="carriage return">cr</button>
      <button type="button" onClick={() => this.apply('\n')} title="line feed">lf</button>
    </div>
    ) : undefined;

    return (
      <div className="specialCharacters">
        {control}
        {dropper}
        {dropdown}
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

  private focusDropdown() {
    if (this.closeTimeout !== null) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  private blurDropdown() {
    this.closeTimeout = setTimeout(() => this.closeDropdown(), 0);
  }

  private closeDropdown() {
    this.closeTimeout = null;

    this.setState({
      showingDropdown: false,
    });
  }

  private toggleDropdown() {
    this.setState({
      showingDropdown: !this.state.showingDropdown,
    });
  }
}