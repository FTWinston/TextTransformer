import * as React from 'react';

const logo = require('./logo.svg');

interface IHeaderProps {
  show: boolean;
  hide: () => void;
}

export class AppHeader extends React.Component<IHeaderProps, {}> {
  render() {
    let headerClass = this.props.show ? 'App-header' : 'App-header__hidden';

    return (
        <div className={headerClass} hidden={!this.props.show}>
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-header-content">
            <h2 className="App-title">Text Transformer</h2>
            <p>
              Easily manipulate, edit and transform text.
              Queue up processes consisting of multiple steps, and save them for later.
              Everything's handled in your browser, without sending it over the web.
            </p>
          </div>
          <div className="App-actionButtons">
            <a className="button" href="https://github.com/FTWinston/TextTransformer">View source</a>
            <button type="button" onClick={() => this.props.hide()}>Hide header</button>
          </div>
        </div>
    );
  }
}