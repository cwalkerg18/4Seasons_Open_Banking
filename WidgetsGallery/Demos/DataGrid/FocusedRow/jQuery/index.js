$(function(){
    var dataGrid = $("#gridContainer").dxDataGrid({
        dataSource: {
            store: {
                type: "odata",
                key: "Task_ID",
                url: "https://js.devexpress.com/Demos/DevAV/odata/Tasks"
            },
            expand: "ResponsibleEmployee",
            select: [
                'Task_ID',
                'Task_Subject',
                'Task_Start_Date',
                'Task_Status',
                'Task_Description',
                'Task_Completion',
                'ResponsibleEmployee/Employee_Full_Name'
              ]
        },
        columns: [
            {
                dataField: "Task_ID",
                width: 80
            }, {
                dataField: "Task_Start_Date",
                caption: "Start Date",
                dataType: "date"
            }, {
                dataField: "ResponsibleEmployee.Employee_Full_Name",
                caption: "Assigned To",
                allowSorting: false
            }, {
                dataField: "Task_Subject",
                caption: "Subject",
                width: 350
            },  {
                dataField: "Task_Status",
                caption: "Status"
            }
        ],
        focusedRowEnabled: true,
        focusedRowKey: 117,
        showBorders: true,
        paging: {
            pageSize: 10
        },
        onFocusedRowChanging: function(e) {
            var rowsCount = e.component.getVisibleRows().length,
                pageCount = e.component.pageCount(),
                pageIndex = e.component.pageIndex();

            if(e.event.key && e.prevRowIndex === e.newRowIndex) {
                if(e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
                    e.component.pageIndex(pageIndex + 1).done(function() {
                        e.component.option("focusedRowIndex", 0);
                    });
                } else if(e.newRowIndex === 0 && pageIndex > 0) {
                    e.component.pageIndex(pageIndex - 1).done(function() {
                        e.component.option("focusedRowIndex", rowsCount - 1);
                    });
                }
            }
        },
        onFocusedRowChanged: function(e) {
            $("#taskSubject").html(e.row.data.Task_Subject);
            $("#taskDetails").html(e.row.data.Task_Description);
            $("#taskStatus").html(e.row.data.Task_Status);

            var progress = e.row.data.Task_Completion ? e.row.data.Task_Completion + "%" : "";
            $("#taskProgress").text(progress);

            $("#taskId").dxNumberBox("instance").option("value", e.component.option("focusedRowKey"));
        }
    }).dxDataGrid("instance");

    $("#taskId").dxNumberBox({
        min: 1,
        max: 183,
        step: 0,
        onValueChanged: function(e) {
            if(e.event && e.value > 0) {
                dataGrid.option("focusedRowKey", e.value);
            }
        }
    });
});