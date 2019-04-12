"use strict";

window.SaleViewer = window.SaleViewer || {};

SaleViewer.Customers = function () {
    var self = this,

        BUBBLES_COUNT = 10,
        BASE_BUBBLE_SIZE = 18,
        ZOOM_COMPENSATOR = 3.5,
        zoomFactor = 3.5,
        yearChanged = true,
        currentYear = SaleViewer.getCurrentDate().getFullYear(),
        citySales = [],
        productsSales = [],
        yearMaxSalesValue = 1,
        maxSalesValue = 1,

        currentCustomerId = 1,
        mapContainer = $("#productsMap"),
        chartContainer = $("#productsChart"),
        
        gridOptions = {
            dataSource: {
                store: []
            },
            paging: {
                pageSize: 4
            },
            selection: {
                mode: "single"
            },
            filterRow: {
                visible: true
            },
            showColumnLines: false,
            columns: [
                {
                    dataField: "name",
                    dataType: "string",
                    width: "20%"
                },
                {
                    dataField: "address",
                    dataType: "string",
                    width: "22%"
                },
                {
                    dataField: "city",
                    dataType: "string",
                    width: "10%"
                },
                {
                    dataField: "state",
                    dataType: "string",
                    width: "8%"
                },
                {
                    dataField: "postalCode",
                    alignment: "left",
                    dataType: "string",
                    width: "12%"
                },
                {
                    dataField: "phone",
                    dataType: "string",
                    width: "15%"
                },
                {
                    dataField: "fax",
                    dataType: "string",
                    width: "13%"
                }],
            onSelectionChanged: function (selectedItems) {
                if (selectedItems.selectedRowKeys.length) {
                    currentCustomerId = selectedItems.selectedRowKeys[0].id;
                    yearChanged = true;
                    self.changeRange();
                }
            },
            showRowLines: false
        },

        getBubbleMaxSize = function () {
            return BASE_BUBBLE_SIZE * (maxSalesValue / yearMaxSalesValue) * zoomFactor / ZOOM_COMPENSATOR * 1.8;
        };

    var zoomChanged = function (arg) {
        zoomFactor = arg;
        map.option('layers[1].maxSize', getBubbleMaxSize());
    };

    var mapOptions = {
        onIncidentOccurred: null,
        layers: [
            {
                dataSource: DevExpress.viz.map.sources.world,
                color: "#d6d7da",
                borderColor: "#d6d7da",
                hoveredBorderColor: "#d6d7da"
            },
            {
                elementType: "bubble",
                hoverEnabled: true,
                color: "#da5859",
                hoveredColor: "transparent",
                borderColor: "#da5859",
                hoveredBorderColor: "#da5859",
                borderWidth: 7,
                hoveredBorderWidth: 7,
                minSize: BASE_BUBBLE_SIZE,
                maxSize: getBubbleMaxSize(),
                dataSource: citySales,
                dataField: "sales"
            }
        ],
        zoomFactor: zoomFactor,
        center: [ -40, 35 ],
        controlBar: {
            enabled: false
        },
        tooltip: {
            enabled: true,
            borderColor: "#d9d9d9",
            color: "#fff",
            font: {
                color: "#b0324f",
                opacity: 1,
                size: 18
            },
            paddingTopBottom: 2,
            customizeTooltip: function() {
                if(this.layer.type === "area") return;
                else return {text: "<span style='font-size: 14px; color: " + SaleViewer.lightColor + "'>" + this.attribute("name") + "</span><br />"
                    + "<span>$" + (this.attribute("sales") / 1000000).toFixed(2) + "M</span>"};
            },
            shadow: {
                opacity: 0.15,
                blur: 0,
                color: "#000000",
                offsetX: 3,
                offsetY: 3
            }
        },
        onZoomFactorChanged: zoomChanged
    };

    mapContainer.dxVectorMap(mapOptions);
    var map = mapContainer.data("dxVectorMap");
    map.showLoadingIndicator();

    var chartOptions = {
        onIncidentOccurred: null,
        palette: "SaleViewPalette",
        rotated: true,
        dataSource: productsSales,
        title: {
            horizontalAlignment: "left",
            text: "PURCHASES BY PRODUCT",
            font: {
                color: SaleViewer.lightColor,
                size: 14,
                weight: 400,
                family: "'Segoe UI', 'Helvetica Neue', 'Trebuchet MS', Verdana"
            }
        },
        argumentAxis: {
            placeholderSize: 17,
            label: {
                visible: false,
            }
        },
        valueAxis: {
            placeholderSize: 30,
            axisDivisionFactor: 50,
            label: {
                format: "currency millions",
                indentFromAxis: 5
            }
        },
        commonSeriesSettings: {
            argumentField: "Criteria",
            valueField: "Sales",
            type: "bar",
            hoverStyle: {
                hatching: {
                    opacity: 0,
                    step: 6,
                    width: 2
                }
            },
            ignoreEmptyPoints: true
        },
        seriesTemplate: {
            nameField: "Criteria",
        },
        legend: {
            visible: true,
            orientation: "horizontal",
            horizontalAlignment: "left",
            verticalAlignment: "bottom",
            itemTextPosition: "right",
            margin: { left: 17 },
            columnCount: 2,
            customizeText: function() {
                return this.seriesName + " / " + Globalize.formatCurrency(productsSales[this.seriesIndex].Sales / 1000000, "USD", { maximumFractionDigits: 1 }) + "M";
            }
        },

    };

    var processMap = function (data) {
        citySales = [];
        maxSalesValue = 1;
        $.each(data, function (index, item) {
            if (index >= BUBBLES_COUNT) return;
            if (maxSalesValue < item.Sales) maxSalesValue = item.Sales;
            citySales.push({
                coordinates: [item.Coordinates[1], item.Coordinates[0]],
                attributes: { name: item.City, sales: item.Sales }
            });
        });
        if (yearChanged || yearMaxSalesValue < maxSalesValue) yearMaxSalesValue = maxSalesValue;
        yearChanged = false;

        map.beginUpdate();
        map.option("layers[1].maxSize", getBubbleMaxSize());
        map.option("layers[1].dataSource", citySales);
        map.endUpdate();
    };


    chartContainer.dxChart(chartOptions);
    var chart = chartContainer.data("dxChart"),
        processChart = function (data) {
            productsSales = data;
            chart.option("dataSource", productsSales);
        };
    chart.showLoadingIndicator();

    self.startDate = Globalize.formatDate(SaleViewer.getCurrentDate(), { raw: "yyyy-01-01" });
    self.endDate = Globalize.formatDate(SaleViewer.getCurrentDate(), { raw: "yyyy-12-30" });

    self.changeRange = function () {
        SaleViewer.loadData({
            companyId: currentCustomerId,
            startDate: self.startDate,
            endDate: self.endDate
        }, processMap, "cities");

        SaleViewer.loadData({
            type: "company",
            companyId: currentCustomerId,
            startDate: self.startDate,
            endDate: self.endDate
        }, processChart, "products");
    };

    self.init = function () {
        
        SaleViewer.sharedWidgets.initRange(function(e) {
            var newYear = e.value[0].getFullYear();
            yearChanged = currentYear != newYear;
            currentYear = newYear;

            var newStartDate = Globalize.formatDate(e.value[0], { raw: "yyyy-MM-dd" }),
                newEndDate = Globalize.formatDate(e.value[1], { raw: "yyyy-MM-dd" });

            if(newStartDate == self.startDate && newEndDate == self.endDate) return;

            self.startDate = newStartDate;
            self.endDate = newEndDate;
            self.changeRange();
        });

        var grid = SaleViewer.sharedWidgets.initGrid(gridOptions);

        grid.load({}, "companies");
    };

};
$(function () {
    SaleViewer.customers = new SaleViewer.Customers();
    SaleViewer.customers.init();
});