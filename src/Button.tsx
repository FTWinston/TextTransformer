import * as React from 'react';
import './Button.css';

interface IButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  title?: string;
  linkUrl?: string;
  dropdown?: [string, () => void][];
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
    let url = this.props.linkUrl;
    let mainButton: JSX.Element;
    if (url === undefined) {
      mainButton = <button type="button" onClick={this.props.onClick} className={this.props.className} title={this.props.title}>{this.props.text}</button>;
    } else {
      let classes = this.props.className === undefined ? 'button' : 'button ' + this.props.className;
      mainButton = <a className={classes} href={this.props.linkUrl} title={this.props.title}>{this.props.text}</a>;
    }

    if (this.props.dropdown === undefined) {
      return mainButton;
    }

    let dropdown = this.state.showingDropdown ? this.renderDropdown() : undefined;

    return (
    <div className="buttons">
      {mainButton}
      <button
        type="button"
        className="buttons-dropper"
        onClick={() => this.toggleDropdown()}
        onFocusCapture={e => this.focusDropdown()}
        title="click for additional settings"
      >
        &#9660;
      </button>
      {dropdown}
    </div>
    );
  }

  private renderDropdown() {
    if (this.props.dropdown === undefined) {
      return undefined;
    }

    let that = this;
    let buttons = this.props.dropdown.map(function (item: [string, () => void], index: number) {
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