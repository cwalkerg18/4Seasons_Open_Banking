import React from 'react';

class ResourceCell extends React.PureComponent {
  render() {
    return (
      <div className={'dx-template-wrapper'}>
        <div className={'name'} style={{ background: this.props.color }}>
          <h2>{this.props.text}</h2>
        </div>
        <div className={'avatar'}>
          <img src={this.props.data.avatar} />
        </div>
        <div className={'info'} style={{ color: this.props.color }}>
                    Age: {this.props.data.age}
          <br />
          <b>{this.props.data.discipline}</b>
        </div>
      </div>
    );
  }
}

export default ResourceCell;
