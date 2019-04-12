window.onload = function() {
    var viewModel = {
        gridOptions: {
            dataSource: orders,
            showBorders: true,
            columns: [
                {
                    dataField: "OrderNumber",
                    caption: "Invoice Number",
                    width: 130
                },
                {
                    dataField: "OrderDate",
                    dataType: "date",
                    width: 160
                }, 
                "Employee",
                {
                    caption: "City",
                    dataField: "CustomerStoreCity"
                },
                {
                    caption: "State",
                    dataField: "CustomerStoreState"  
                },
                {
                    dataField: "SaleAmount",
                    alignment: "right",
                    format: "currency"
                }
            ],
            onCellPrepared: e => {
                if(e.rowType === 'data') {
                    if(e.data.OrderDate < new Date(2014, 2, 3)) {
                        e.cellElement.addClass('oldOrder');
                    }
                    if(e.data.SaleAmount > 15000) {
                        if(e.column.dataField === 'Employee') {
                            e.cellElement.addClass('highAmountOrder_employee');
                        }
                        if(e.column.dataField === 'SaleAmount') {
                            e.cellElement.addClass('highAmountOrder_saleAmount');
                        }
                    }
                }
            },
            export: {
                enabled: true,
                customizeExcelCell: options => {
                    if(options.gridCell.rowType === 'data') {
                        if(options.gridCell.data.OrderDate < new Date(2014, 2, 3)) {
                            options.font.color = '#AAAAAA';
                        }
                        if(options.gridCell.data.SaleAmount > 15000) {
                            if(options.gridCell.column.dataField === 'Employee') {
                                options.font.bold = true;
                            }
                            if(options.gridCell.column.dataField === 'SaleAmount') {
                                options.backgroundColor = '#FFBB00';
                                options.font.color = '#000000';
                            }
                        }
                    }
                }
            },
        }
    };
    
    ko.applyBindings(viewModel, document.getElementById("grid"));
};