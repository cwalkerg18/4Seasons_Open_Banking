"use strict";

window.SaleViewer = window.SaleViewer || {};

SaleViewer.Customers = function () {
    var self = this,
        currentProductId = 1,
        chartsCategories = ["sectors", "regions", "channels"],
        gridOptions = {
            dataSource: {
                store: []
            },
            paging: {
                pageSize: 6
            },
            selection: {
                mode: "single"
            },
            showColumnLines: false,
            columns: [
                {
                    dataField: "name",
                    dataType: "string",
                    width: "15%"
                },
                {
                    dataField: "description",
                    dataType: "string",
                    width: "30%"
                },
                {
                    dataField: "baseCost",
                    dataType: "number",
                    width: "10%",
                    format: "currency",
                    alignment: "right"
                },
                {
                    dataField: "listPrice",
                    dataType: "number",
                    width: "10%",
                    format: "currency",
                    alignment: "right"
                },
                {
                    dataField: "unitsInInventory",
                    dataType: "number",
                    width: "15%",
                    alignment: "right",
                    cellTemplate: function(container, options) {
                        var unitsInInventory = options.data.unitsInInventory;
                        if (unitsInInventory < 0) {
                            container.html("<b>" + unitsInInventory + "</b>");
                        } else {
                            container.html(unitsInInventory);
                        }
                    }
                },
                {
                    dataField: "unitsInManufacturing",
                    dataType: "number",
                    width: "20%",
                    alignment: "right"
                }],

            onSelectionChanged: function (selectedItems) {
                if (selectedItems.selectedRowKeys.length) {
                    currentProductId = selectedItems.selectedRowKeys[0].id;
                    self.changeRange();
                }
            },
            showRowLines: false
        },

        chartOptions = {
            onIncidentOccurred: null,
            palette: "SaleViewPalette",
            dataSource: [],
            type: "doughnut",
            innerRadius: 0.62,
            series: {
                argumentField: "Criteria",
                valueField: "Sales",
                hoverStyle: {
                    hatching: {
                        opacity: 0,
                        step: 6,
                        width: 2
                    }
                }
            },
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center",
                itemTextPosition: "right",
                rowItemSpacing: 5,
                columnCount: 2,
                rowCount: 3,
                orientation: "vertical",
                paddingLeftRight: 0,
                paddingTopBottom: 0,
                font: {
                    color: SaleViewer.lightColor,
                    size: 12,
                    opacity: 1
                }
            },
            tooltip: {
                enabled: true,
                border: {
                    visible: false
                },
                color: "#fff",
                font: {
                    color: SaleViewer.darkColor,
                    opacity: 1,
                    size: 18
                },
                paddingTopBottom: 8,
                customizeTooltip: function () {
                    if (this.type === "area") return;
                    else return {
                        text: "<span style='font-size: 14px; color: " + SaleViewer.lightColor + ";'>" + this.argument + "</span><br />"
                            + "<span>$" + (this.originalValue / 1000000).toFixed(2) + "M</span>"
                    };
                },
                shadow: {
                    opacity: 0.15,
                    blur: 0,
                    color: "#000000",
                    offsetX: 3,
                    offsetY: 3
                }
            }
        },
        charts = [];

    
    $.each(chartsCategories, function (_, item) {
        charts.push(SaleViewer.sharedWidgets.initChart(item, chartOptions, "pie"));
    });

    self.startDate = Globalize.formatDate(SaleViewer.getCurrentDate(), { raw: "yyyy-01-01" });
    self.endDate = Globalize.formatDate(SaleViewer.getCurrentDate(), { raw: "yyyy-12-30" });

    self.changeRange = function() {

        SaleViewer.loadData({
            id: currentProductId,
        }, function(data) {
            $("#plant").html(data[0].plant.replace(/\|/g, "<br />"));
            $("#pManager").html(data[0].pManager.replace(/\|/g, "<br />"));
            $("#sManager").html(data[0].sManager.replace(/\|/g, "<br />"));
        }, "goods");

        $.each(charts, function(_, item) {
            item.load({
                type: "product",
                productId: currentProductId,
                startDate: self.startDate,
                endDate: self.endDate
            });
        });
    };

    self.init = function () {

        var grid = SaleViewer.sharedWidgets.initGrid(gridOptions);
        grid.load({}, "goods");

        SaleViewer.sharedWidgets.initRange(function (e) {
            var newStartDate = Globalize.formatDate(e.value[0], { raw: "yyyy-MM-dd" }),
                newEndDate = Globalize.formatDate(e.value[1], { raw: "yyyy-MM-dd" });

            if(newStartDate == self.startDate && newEndDate == self.endDate) return;

            self.startDate = newStartDate;
            self.endDate = newEndDate;
            self.changeRange();
        },
        {
            shutter: {
                color: '#f5f5f5',
                opacity: 0.75
            }
        });
    };


};
$(function () {
    SaleViewer.customers = new SaleViewer.Customers();
    SaleViewer.customers.init();
});
