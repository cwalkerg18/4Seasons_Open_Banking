This demo shows how to&nbsp;populate a&nbsp;lookup column depending on&nbsp;the value of&nbsp;another column. For example, if&nbsp;you select a&nbsp;state, the City column allows selecting cities located only in&nbsp;this state. In&nbsp;code, this is&nbsp;achieved by&nbsp;applying a&nbsp;filter to&nbsp;the lookup data source in&nbsp;the **lookup.dataSource** function. Also, take note of&nbsp;the **columns.setCellValue** function that resets the selected city each time you choose another state, and the **onEditorPreparing** function that disables the City cell if&nbsp;the state is&nbsp;undefined.