import React from 'react';

import HTMLReactParser from 'html-react-parser';

import { markup } from './data.js';
import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';

class App extends React.Component {
  constructor() {
    super();

    this.sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
    this.fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'];
    this.headerValues = [false, 1, 2, 3, 4, 5];
  }
  render() {
    return (
      <React.Fragment>
        <div className={'widget-container'}>
          <HtmlEditor>
            <Toolbar>
              <Item formatName={'undo'} />
              <Item formatName={'redo'} />
              <Item formatName={'separator'} />
              <Item
                formatName={'size'}
                formatValues={this.sizeValues}
              />
              <Item
                formatName={'font'}
                formatValues={this.fontValues}
              />
              <Item formatName={'separator'} />
              <Item formatName={'bold'} />
              <Item formatName={'italic'} />
              <Item formatName={'strike'} />
              <Item formatName={'underline'} />
              <Item formatName={'separator'} />
              <Item formatName={'alignLeft'} />
              <Item formatName={'alignCenter'} />
              <Item formatName={'alignRight'} />
              <Item formatName={'alignJustify'} />
              <Item formatName={'separator'} />
              <Item
                formatName={'header'}
                formatValues={this.headerValues}
              />
              <Item formatName={'separator'} />
              <Item formatName={'orderedList'} />
              <Item formatName={'bulletList'} />
              <Item formatName={'separator'} />
              <Item formatName={'color'} />
              <Item formatName={'background'} />
              <Item formatName={'separator'} />
              <Item formatName={'link'} />
              <Item formatName={'image'} />
              <Item formatName={'separator'} />
              <Item formatName={'clear'} />
              <Item formatName={'codeBlock'} />
              <Item formatName={'blockquote'} />
            </Toolbar>
            {HTMLReactParser(markup)}
          </HtmlEditor>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
