import React from 'react';
import { ButtonGroup } from 'devextreme-react';
import { alignments, fontStyles } from './data.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className={'dx-fieldset'}>
          <div className={'dx-field'}>
            <div className={'dx-field-value'}>
              <ButtonGroup
                items={alignments}
                keyExpr={'alignment'}
                stylingMode={'outlined'}
              />
            </div>
          </div>
          &nbsp;
          <div className={'dx-field'}>
            <div className={'dx-field-value'}>
              <ButtonGroup
                items={fontStyles}
                keyExpr={'style'}
                stylingMode={'outlined'}
                selectionMode={'multiple'}
              />
            </div>
          </div>
        </div>
        <div className={'dx-fieldset dx-buttongroup-mode-text'}>
          <div className={'dx-field dx-theme-border-color dx-demo-separator'}>
            <ButtonGroup
              items={alignments}
              keyExpr={'alignment'}
              stylingMode={'text'}
            />
          </div>
          &nbsp;
          <div className={'dx-field'}>
            <div className={'dx-field-value'}>
              <ButtonGroup
                items={fontStyles}
                keyExpr={'style'}
                stylingMode={'text'}
                selectionMode={'multiple'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
