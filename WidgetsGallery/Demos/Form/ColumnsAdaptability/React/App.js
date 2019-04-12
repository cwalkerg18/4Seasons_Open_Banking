import React from 'react';
import { CheckBox, Form } from 'devextreme-react';
import employee from './data.js';

const screenByWidth = (width) => width < 720 ? 'sm' : 'md';
const colCountByScreen = {
  sm: 2,
  md: 4
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      useColCountByScreen: true
    };
    this.onUseColCountByScreenChanged = this.onUseColCountByScreenChanged.bind(this);
  }

  render() {
    const { useColCountByScreen } = this.state;

    return (
      <div>
        <Form
          id={'form'}
          formData={employee}
          colCountByScreen={useColCountByScreen ? colCountByScreen : null}
          labelLocation={'top'}
          minColWidth={233}
          colCount={'auto'}
          screenByWidth={screenByWidth}
        />
        <div className={'options'}>
          <div className={'caption'}>Options</div>
          <div className={'option'}>
            <CheckBox
              text={'Set the count of columns regardless of screen size'}
              value={useColCountByScreen}
              onValueChanged={this.onUseColCountByScreenChanged}
            />
          </div>
        </div>
      </div>
    );
  }

  onUseColCountByScreenChanged(e) {
    this.setState({
      useColCountByScreen: e.value
    });
  }
}

export default App;
