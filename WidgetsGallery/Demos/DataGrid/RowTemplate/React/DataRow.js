import React from 'react';
import Globalize from 'globalize';
import 'devextreme/localization/globalize/date';

const formatDate = function(date) {
  return Globalize.formatDate(new Date(date), { raw: 'yyyy/MM/dd' });
};

export default function DataRow(rowInfo) {
  return (
    <tbody className={'employee dx-row'}>
      <tr className={'main-row'}>
        <td rowSpan={'2'}><img src={rowInfo.data.Picture} /></td>
        <td>{rowInfo.data.Prefix}</td>
        <td>{rowInfo.data.FirstName}</td>
        <td>{rowInfo.data.LastName}</td>
        <td>{rowInfo.data.Position}</td>
        <td>{formatDate(rowInfo.data.BirthDate)}</td>
        <td>{formatDate(rowInfo.data.HireDate)}</td>
      </tr>
      <tr className={'notes-row'}>
        <td colSpan={'6'}><div>{rowInfo.data.Notes}</div></td>
      </tr>
    </tbody>
  );
}
