import React from 'react';

function isWeekEnd(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function getCurrentTraining(date, employeeID) {
  const result = (date + employeeID) % 3;
  const currentTraining = `training-background-${result}`;

  return currentTraining;
}

class DataCell extends React.PureComponent {

  render() {
    const dayClasses = [
      'day-cell',
      getCurrentTraining(this.props.startDate.getDate(), this.props.groups.employeeID)
    ];

    const employeeClasses = [ `employee-${this.props.groups.employeeID}`, 'dx-template-wrapper' ];
    if (isWeekEnd(this.props.startDate)) {
      employeeClasses.push(`employee-weekend-${this.props.groups.employeeID}`);
    }

    return (
      <div className={employeeClasses.join(' ')}>
        <div className={dayClasses.join(' ')}>
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default DataCell;
