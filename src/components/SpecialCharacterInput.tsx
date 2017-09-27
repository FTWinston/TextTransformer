import * as React from 'react';
import { Dropdown } from './Dropdown';
import './SpecialCharacterInput.css';
import './Dropdown.css';

interface ISpecialCharacterProps {
  singleLine: boolean;
  className?: string;
  defaultValue: string;
  valueChanged: (value: string) => void;
}

interface ISpecialCharacterState {
  showingDropdown: boolean;
}

type menuItem = [string, () => void];

export class SpecialCharacterInput extends React.Component<ISpecialCharacterProps, ISpecialCharacterState> {
  private control: HTMLTextAreaElement | HTMLInputElement;
  private dropdown: Dropdown;
  private closeTimeout: number | null;

  private menuItems: menuItem[] = [
    ['tab', () => this.apply('	')],
    ['clear', () => this.clear()],
  ];

  constructor(props: ISpecialCharacterProps) {
    super(props);

    this.closeTimeout = null;

    this.state = {
      showingDropdown: false,
    };
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
        onFocus={e => this.dropdown.focusDropdown()}
      >
        &#9660;
      </button>
    );

    let dropdown = (
      <Dropdown
        visible={this.state.showingDropdown}
        items={this.menuItems}
        hide={() => this.closeDropdown()}
        ref={el => { if (el !== null) { this.dropdown = el; }}}
      />
    );

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
    this.props.valueChanged(this.control.value);

    this.control.focus();
  }

  private clear() {
    this.control.value = '';
    this.props.valueChanged(this.control.value);
    this.control.focus();
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