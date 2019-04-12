"use strict";

window.SaleViewer = window.SaleViewer || {};

SaleViewer.Sales = function () {
    var discountCellTemplate = function(container, options) {
        container.css({ overflow: "visible", padding: 0 });

        $("<div/>").dxBullet({
            onIncidentOccurred: null,
            size: {
                width: 150,
                height: 35
            },
            margin: {
                top: 5,
                bottom: 0,
                left: 5
            },
            showTarget: false,
            showZeroLevel: true,
            value: options.value * 100,
            target: 50,
            color: "#da5859",
            startScaleValue: 0,
            endScaleValue: 100,
            tooltip: {
                enabled: true,
                font: {
                    color: "#b0324f",
                    opacity: 1,
                    size: 18
                },
                paddingTopBottom: 2,
                customizeTooltip: function() {
                    return { text: options.text };
                },
                shadow: {
                    opacity: 0.15,
                    blur: 0,
                    color: "#000000",
                    offsetX: 3,
                    offsetY: 3
                },
                zIndex: 5
            }
        }).appendTo(container);
    };

    var date = {
        startDate: Globalize.formatDate(SaleViewer.getCurrentDate(), { raw: "yyyy-01-01" }),
        endDate: Globalize.formatDate(SaleViewer.getCurrentDate(), { raw: "yyyy-12-30" })
    };

    var gridOptions = {
        dataSource: {
            store: {
                type: "odata",
                url: "odata/DaySaleDtoes",
                beforeSend: function (request) {
                    request.params.startDate = date.startDate;
                    request.params.endDate = date.endDate;
                }
            }
            
        },
        paging: {
            pageSize: 25
        },

        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [10, 25, 50, 100]
        },

        searchPanel: {
            visible: true,
            highlightCaseSensitive: true
        },
        groupPanel: { visible: true },
        allowColumnReordering: true,
        rowAlternationEnabled: true,

        columns: [
            { dataField: "Product" },
            {
                dataField: "Amount",
                caption: "Sale Amount",
                dataType: "number",
                format: "currency",
                alignment: "right",
            },
            {
                dataField: "Discount",
                caption: "Discount %",
                dataType: "number",
                format: "percent",
                alignment: "right",
                allowGrouping: false,
                width: 150,
                cellTemplate: discountCellTemplate
            },
            {
                dataField: "SaleDate",
                dataType: "date"
            },
            {
                dataField: "Region",
                dataType: "string",
                groupIndex: 0
            },
            {
                dataField: "Sector",
                dataType: "string",
            },
            {
                dataField: "Channel",
                dataType: "string",
            },
            {
                dataField: "Customer",
                dataType: "string",
                width: 150
            }],
        showRowLines: false
    };


    this.init = function () {
        var grid = SaleViewer.sharedWidgets.initGrid(gridOptions);

        SaleViewer.sharedWidgets.initRange(function(e) {

            var startDate = Globalize.formatDate(e.value[0], { raw: "yyyy-MM-dd" }),
                endDate = Globalize.formatDate(e.value[1], { raw: "yyyy-MM-dd" });

            if(date.startDate != startDate || date.endDate != endDate) {
                date.startDate = startDate;
                date.endDate = endDate;
                grid.instance.refresh();
            }
        });
    };
};

$(function () {
    SaleViewer.sales = new SaleViewer.Sales();
    SaleViewer.sales.init();
});