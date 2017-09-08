import * as React from 'react';
import './Button.css';

interface IButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  className?: string;
  title?: string;
  linkUrl?: string;
}

export class Button extends React.Component<IButtonProps, {}> {
  render() {
    let text = this.props.text;

    let classes = this.props.className;

    let url = this.props.linkUrl;
    let mainButton: JSX.Element;
    if (url === undefined) {
      mainButton = (
        <button
          type="button"
          onClick={this.props.onClick}
          onFocusCapture={this.props.onFocus}
          className={classes}
          title={this.props.title}
        >
          {text}{this.props.children}
        </button>
      );
    } else {
      if (classes !== undefined) {
        classes += ' button';
      } else {
        classes = 'button';
      }

      mainButton = <a className={classes} href={this.props.linkUrl} title={this.props.title}>{text}{this.props.children}</a>;
    }

    return mainButton;
  }
}