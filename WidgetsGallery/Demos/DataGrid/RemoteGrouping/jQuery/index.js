$(function(){
    var priority = [ 
        { name: "High", value: 4 }, 
        { name: "Urgent", value: 3 }, 
        { name: "Normal", value: 2 }, 
        { name: "Low", value: 1 }
    ];
    
    $("#gridContainer").dxDataGrid({
        showBorders: true,
        dataSource: {
            store: {
                type: "odata",
                url: "https://js.devexpress.com/Demos/DevAV/odata/Tasks"
            },
            expand: "ResponsibleEmployee",
            select: [
                "Task_ID",
                "Task_Subject",
                "Task_Start_Date",
                "Task_Due_Date",
                "Task_Status",
                "Task_Priority",
                "ResponsibleEmployee/Employee_Full_Name"
            ]
        },
        scrolling: {
            mode: "virtual"
        },
        groupPanel: {
            visible: true
        },
        columns: [
            {
                dataField: "Task_ID",
                width: 90
            }, {
                caption: "Subject",
                dataField: "Task_Subject",
                width: 190
            }, {
                caption: "Status",
                dataField: "Task_Status",
                groupIndex: 0
            }, {
                caption: "Priority",
                dataField: "Task_Priority",
                lookup: { 
                    dataSource: priority, 
                    valueExpr: "value", 
                    displayExpr: "name"
                },
                groupIndex: 1        
            }, {
                caption: "Assigned To",
                dataField: "ResponsibleEmployee.Employee_Full_Name",
                allowGrouping: false,
                allowSorting: false
            }, {   
                caption: "Start Date",
                dataField: "Task_Start_Date",
                dataType: "date"
            }, {
                caption: "Due Date",
                dataField: "Task_Due_Date",
                dataType: "date"
            }
        ]
    });
});