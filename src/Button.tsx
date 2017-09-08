import * as React from 'react';
import './Button.css';

type menuItem = [string, () => void];

interface IButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  title?: string;
  linkUrl?: string;
  dropdown?: menuItem[];
}

interface IButtonState {
  showingDropdown: boolean;
}

export class Button extends React.Component<IButtonProps, IButtonState> {
  private dropdown: HTMLDivElement | null;
  private closeTimeout: number | null;

  constructor(props: IButtonProps) {
    super(props);

    this.dropdown = null;
    this.closeTimeout = null;

    this.state = {
      showingDropdown: false,
    };
  }

  componentDidUpdate(prevProps: IButtonProps, prevState: IButtonState) {
    if (this.dropdown !== null) {
      this.dropdown.focus();
    }
  }

  render() {
    let text = this.props.text;

    let onClick: ((e?: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
    let onFocus: ((e:  React.FocusEvent<HTMLButtonElement>) => void) | undefined;
    let dropper;

    if (this.props.dropdown !== undefined) {
      onClick = () => this.toggleDropdown();
      onFocus = e => this.focusDropdown();
      dropper = <span className="buttons-dropper">&#9660;</span>;
    } else {
      onClick = this.props.onClick;
      onFocus = undefined;
      dropper = undefined;
    }

    let url = this.props.linkUrl;
    let mainButton: JSX.Element;
    if (url === undefined) {
      mainButton = (
        <button
          type="button"
          onClick={onClick}
          onFocusCapture={onFocus}
          className={this.props.className}
          title={this.props.title}
        >
          {text}{dropper}
        </button>
      );
    } else {
      let classes = this.props.className === undefined ? 'button' : 'button ' + this.props.className;
      mainButton = <a className={classes} href={this.props.linkUrl} title={this.props.title}>{text}</a>;
    }

    if (this.props.dropdown === undefined) {
      return mainButton;
    }

    let dropdown = this.state.showingDropdown ? this.renderDropdown() : undefined;

    return (
    <div className="buttons">
      {mainButton}
      {dropdown}
    </div>
    );
  }

  private renderDropdown() {
    if (this.props.dropdown === undefined) {
      return undefined;
    }

    let that = this;
    let buttons = this.props.dropdown.map(function (item: menuItem, index: number) {
      return <button key={index} type="button" onClick={() => {that.closeDropdown(); item[1](); }}>{item[0]}</button>;
    });

    return (
    <div
      className="buttons-dropdown"
      tabIndex={-1}
      ref={el => this.dropdown = el}
      onFocusCapture={e => this.focusDropdown()}
      onBlurCapture={e => this.blurDropdown(e)}
    >
      {buttons}
    </div>
    );
  }

  private focusDropdown() {
    if (this.closeTimeout !== null) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  private blurDropdown(event: React.FocusEvent<HTMLDivElement>) {
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