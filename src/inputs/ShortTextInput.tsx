import * as React from 'react';
import TextParameter from '../model/parameters/TextParameter';

interface IShortTextData {
  parameter: TextParameter;
}

class ShortTextInput extends React.Component<IShortTextData, IShortTextData> {
  constructor(props: IShortTextData) {
    super(props);
  }
  render() {
    return (
    <div className="field">
      <label>
        <span>{this.props.parameter.name}</span>
        <input type="text" autoComplete="off" className="value" />
      </label>
    </div>
    );
  }
}

export default ShortTextInput;
