"use strict";

window.SaleViewer = window.SaleViewer || {};

SaleViewer.SharedWidgets = function () {
    var self = this;

    self.initRange = function (selectedRangeChanged, customOptions) {
        var rangeContainer = $("#rangeSelector");

        var options = {
            selectedRangeColor: "rgba(0,0,0,0)",
            onIncidentOccurred: null,
            behavior: {
                animationEnabled: false
            },
            loadingIndicator: {
                backgroundColor: "rgba(0,0,0,0)"
            },
            indent: {
                right: 32,
                left: 32
            },
            scale: {
                marker: { visible: false },
                minorTick: {
                    visible: false
                },
                tickInterval: "month",
                minorTickInterval: "day",
                valueType: "datetime",
                tick: {
                    color: "black",
                    opacity: 0.1
                },
                label: {
                    customizeText: function(value) {
                        if(!(value.value instanceof Date))
                            return value.valueText;

                        var month = value.value.getMonth(),
                            year = value.value.getFullYear(),
                            today = new Date();
                        if(month === 0 || month === 11 ||
                            (year === today.getFullYear() && month === today.getMonth())) {
                            return value.valueText + " " + year;
                        }
                        return value.valueText;
                    },
                    font: {
                        color: SaleViewer.lightColor
                    }
                }
            },
            size: {
                height: 90
            },
            sliderMarker: {
                color: "#DA5859",
                format: "MM/dd"
            },
            sliderHandle: {
                color: "black",
                opacity: 0.1
            },
            chart: {
                series: [{
                    type: "line",
                    point: { visible: false },
                    color: "#DA5859",
                    opacity: 0.8,
                    argumentField: "SaleDate",
                    valueField: "Sales"
                }]
            },

            dataSource: [],
            onValueChanged: selectedRangeChanged
        };

        $.extend(options, customOptions || {});
        rangeContainer.dxRangeSelector(options);

        var range = rangeContainer.data("dxRangeSelector");
        range.showLoadingIndicator();

        var drawRangeSelector = function(dataSource) {
            range.option("dataSource", dataSource);
        },

        rangeYear = SaleViewer.getCurrentDate().getFullYear(),
        nextYear = $("#nextYear"),
        prevYear = $("#prevYear"),
        changeRangeYear = function(offset) {
            var newYear = rangeYear + offset,
                newStart = new Date(newYear, 0, 1),
                newEnd = new Date(newYear, 11, 31);
            if (newYear > new Date().getFullYear()) {
                return;
            }

            function setRangeYear(year) {
                rangeYear = newYear;
                nextYear.removeClass("disabled");
                prevYear.removeClass("disabled");
                if (year >= new Date().getFullYear()) {
                    nextYear.addClass("disabled");
                }
                if (year <= new Date().getFullYear() - 2) {
                    prevYear.addClass("disabled");
                }
            }

            SaleViewer.loadData({
                startDate: Globalize.formatDate(newStart, { raw: "yyyy-MM-dd" }),
                endDate: Globalize.formatDate(newEnd, { raw: "yyyy-MM-dd" })
            }, function (data) {
                if (data && data.length) {
                    data = data.slice(0, -1);
                    setRangeYear(newYear);
                    drawRangeSelector(data);
                }
            }, "sales");
        };

        changeRangeYear(0);

        prevYear.click(function () { changeRangeYear(-1); });
        nextYear.click(function () { changeRangeYear(1); });
    };


    self.initGrid = function (options) {
        var gridContainer = $("#grid");
        gridContainer.dxDataGrid(options);
        var grid = gridContainer.data("dxDataGrid");

        return {
            instance: grid,
            load: function (loadOptions, category, selectFirst) {
                grid.beginCustomLoading();
                SaleViewer.loadData(loadOptions, function (data) {
                    grid.option("dataSource", { store: data });
                    grid.endCustomLoading();
                    if (selectFirst === undefined || selectFirst) grid.selectRows(data[0]);
                }, category);
            }
        };
    };

    self.initChart = function (id, options, type, salt) {

        var chartContainer = $("#" + type + "-" + id + (salt || "")),
            chart = null;
        var defaultOptions = {
            loadingIndicator: {
                backgroundColor: "rgba(0,0,0,0)"
            }
        };
        $.extend(true, options, defaultOptions);
        if (type == "pie") {
            chartContainer.dxPieChart(options);
            chart = chartContainer.data("dxPieChart");
        } else {
            chartContainer.dxChart(options);
            chart = chartContainer.data("dxChart");
        }

        return {
            instance: chart,
            load: function (loadOptions) {
                chart.showLoadingIndicator();
                SaleViewer.loadData(loadOptions, function (data) {
                    chart.option("dataSource", data);
                }, id);
            }
        };
    };

    self.initPopup = function () {
        $("#popup").dxPopup({
            visible: false,
            fullScreen: false,
            showTitle: false,
            showCloseButton: false,
            position: { offset:"0 -90px" },
            height: 'auto',
            width: 500
        });

        var popup = $("#popup").data("dxPopup");
                
        $("body").on("click", "#closePopupButton", function () {
            popup.option("visible", false);
        }); 

        $("body").on("click", "#downloadPopupButton", function () {
            window.open("https://js.devexpress.com/Download/", "_blank");
        });

        $("#openPopupButton").click(function () {
            popup.option("visible", true);
        });
        
    };

    self.getMaxAxisValue = function (data, dataField) {
        var maxSeries = [4000, 8000, 20000, 40000, 80000, 120000, 200000, 400000, 800000, 1200000, 2000000, 4000000, 8000000, 12000000, 20000000, 40000000, 80000000, 120000000, 200000000],
            max = 0,
            index = 0;
        $.each(data, function (_, object) {
            $.each(object, function (index, value) {
                if (dataField !== undefined && dataField != index) return;
                if ($.isNumeric(value) && value > max) max = value;
            });
        });
        $.each(maxSeries, function (i, value) {
            if (value >= max) {
                index = i;
                return false;
            }
        });
        return maxSeries[index];
    };
    
};