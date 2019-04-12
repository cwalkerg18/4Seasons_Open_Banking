import React from 'react';
import { Button } from 'devextreme-react';
import notify from 'devextreme/ui/notify';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  onClick(e) {
    const buttonText = e.component.option('text');
    notify(`The ${buttonText} button was clicked`);
  }

  render() {
    const buttons = [];

    const baseOptions = [
      { text: 'OK', type: 'normal' },
      { text: 'Apply', type: 'success' },
      { text: 'Done', type: 'default' },
      { text: 'Delete', type: 'danger' }
    ];
    const modes = [ 'contained', 'outlined', 'text' ];

    modes.forEach(mode => {
      baseOptions.forEach(options => {
        const key = options.text + options.type + mode;
        buttons.push(<div key={`container${key}`}>
          <Button
            key={key}
            width={90}
            text={options.text}
            type={options.type}
            stylingMode={mode}
            onClick={this.onClick}
          />
        </div>);
      });
    });

    return (
      <div className={'buttons-demo'}>
        <div className={'header'}>
          <div></div>
          <div>Normal</div>
          <div>Success</div>
          <div>Default</div>
          <div>Danger</div>
        </div>
        <div className={'types'}>
          <div>Contained</div>
          <div>Outlined</div>
          <div>Text</div>
        </div>
        <div className={'buttons'}>
          {buttons}
        </div>
      </div>
    );
  }
}

export default App;
