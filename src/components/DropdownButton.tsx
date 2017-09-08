import * as React from 'react';
import { Button } from './Button';
import { Dropdown } from './Dropdown';

type menuItem = [string, () => void];

interface IButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  title?: string;
  linkUrl?: string;
  dropdownItems?: menuItem[];
}

interface IButtonState {
  showingDropdown: boolean;
}

export class DropdownButton extends React.Component<IButtonProps, IButtonState> {
  private dropdown: Dropdown;

  constructor(props: IButtonProps) {
    super(props);

    this.state = {
      showingDropdown: false,
    };
  }

  render() {
    let dropper = <span className="buttons-dropper">&#9660;</span>;

    let classes = this.props.className;
    if (this.state.showingDropdown) {
      if (classes !== undefined) {
        classes += ' button_expanded';
      } else {
        classes = 'button_expanded';
      }
    }

    return (
    <div className="buttons">
      <Button
        onClick={() => this.toggleDropdown()}
        onFocus={e => this.dropdown.focusDropdown()}
        className={classes}
        title={this.props.title}
        text={this.props.text}
        children={dropper}
      />
      <Dropdown
        visible={this.state.showingDropdown}
        items={this.props.dropdownItems}
        hide={() => this.closeDropdown()}
        ref={el => { if (el !== null) { this.dropdown = el; }}}
      />
    </div>
    );
  }

  private closeDropdown() {
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