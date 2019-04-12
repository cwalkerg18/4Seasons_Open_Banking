$(function(){
    $("#lookup").dxLookup({
        items: employeesList,
        value: employeesList[0],
        showPopupTitle: false
    });
    
    $("#lookup-grouped").dxLookup({
        dataSource: new DevExpress.data.DataSource({ 
            store: employeesTasks, 
            key: "ID", 
            group: "Assigned"
        }),
        grouped: true,
        closeOnOutsideClick: true,
        showPopupTitle: false,
        displayExpr: "Subject"
    });
});