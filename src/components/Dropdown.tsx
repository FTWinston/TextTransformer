import * as React from 'react';
import './Dropdown.css';

type menuItem = [string, () => void];

interface IDropdownProps {
  items?: menuItem[];
  visible: boolean;
  hide: () => void;
}

export class Dropdown extends React.Component<IDropdownProps, {}> {
  private dropdown: HTMLDivElement | null;
  private closeTimeout: number | null;

  constructor(props: IDropdownProps) {
    super(props);

    this.dropdown = null;
    this.closeTimeout = null;
  }

  componentDidUpdate(prevProps: IDropdownProps, prevState: {}) {
    if (this.props.visible && this.dropdown !== null) {
      this.dropdown.focus();
    }
  }

  render() {
    if (!this.props.visible || this.props.items === undefined) {
      return null;
    }

    let that = this;
    let buttons = this.props.items.map(function (item: menuItem, index: number) {
      return <button key={index} type="button" onClick={() => {that.closeDropdown(); item[1](); }}>{item[0]}</button>;
    });

    return (
    <div
      className="dropdown"
      tabIndex={-1}
      ref={el => this.dropdown = el}
      onFocusCapture={e => this.focusDropdown()}
      onBlurCapture={e => this.blurDropdown()}
    >
      {buttons}
    </div>
    );
  }

  focusDropdown() {
    if (this.closeTimeout !== null) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  private blurDropdown() {
    this.closeTimeout = window.setTimeout(() => this.closeDropdown(), 0);
  }

  private closeDropdown() {
    this.closeTimeout = null;
    this.props.hide();
  }
}