"use strict";

window.SaleViewer = window.SaleViewer || {};

SaleViewer.Channels = function () {
    var self = this,
        fields = ["Consultants", "Direct", "Resellers", "Retail", "VARs"],
        category = "channels",
        chartOptions = {
            onIncidentOccurred: null,
            palette: "SaleViewPalette",
            dataSource: [],
            panes: {
                border: {
                    visible: true
                }
            },
            argumentAxis: {
                grid: {
                    visible: true
                },
                valueMarginsEnabled: false,
                placeholderSize: 25,
                argumentType: "datetime",
                tickInterval: { hours: 1 },
                minorTickInterval: { minutes: 30 },
                minorGrid: {
                    visible: true,
                    opacity: 1
                },
                label: {
                    overlappingBehavior: "none",
                    format: "shorttime",
                    customizeText: function() {
                        if(this.valueText != "8:00 AM")
                            return this.valueText;
                    }
                }
            },
            valueAxis: {
                placeholderSize: 40,
                grid: {
                    visible: true
                },
                label: {
                    format: "thousands"
                }
            },
            commonSeriesSettings: {
                type: "line",
                argumentField: "SaleDate",
            },

            series: [
                {
                    valueField: "Consultants", name: "Consultants",
                    point: { visible: false }
                },
                {
                    valueField: "Direct", name: "Direct",
                    point: { visible: false }
                },
                {
                    valueField: "Resellers", name: "Resellers",
                    point: { visible: false }
                },
                {
                    valueField: "Retail", name: "Retail",
                    point: { visible: false }
                },
                {
                    valueField: "VARs", name: "VARs",
                    point: { visible: false }
                }
            ],
            legend: {
                visible: false
            }
        },
        chart = SaleViewer.sharedWidgets.initChart(category, chartOptions, "chart", "performance"),

        update = function (date) {
            SaleViewer.loadData({ day: Globalize.formatDate(date, { raw: "yyyy-MM-dd" }) }, updateDailyValues, category);
        },

        switcher = new SaleViewer.Switcher({
            onChange: function (date) {
                update(date);
            },
            date: SaleViewer.getCurrentDate()
        }),

        updateDailyValues = function (value) {
            if (value.length < 6) {
                switcher.reverse();
                return;
            }
            var results = {
                    dailyRetail: 0,
                    dailyDirect: 0,
                    dailyConsultants: 0,
                    dailyVARs: 0,
                    dailyResellers: 0,
                    dailyTotal: 0
                },
                dataSource = [];

            $.each(value, function () {
                var hourResult = this.SalesByChannel;
                $.each(fields, function () {
                    hourResult[this] = hourResult[this] || 0;
                    results["daily" + this] += hourResult[this];
                });

                $.extend(hourResult, { SaleDate: new Date(this.SaleDate) });
                dataSource.push(hourResult);
            });

            chart.instance.option("dataSource", dataSource);

            $.each(fields, function () {
                results.dailyTotal += results["daily" + this];
                $("#daily" + this).text(Globalize.formatCurrency(Math.round(results["daily" + this]), "USD", { maximumFractionDigits: 0 }));
            });

            $("#dailyTotal").text(Globalize.formatCurrency(Math.round(results.dailyTotal), "USD", { maximumFractionDigits: 0 }));
        };

    
    self.init = function () {
        update(SaleViewer.getCurrentDate());
        SaleViewer.legend = new SaleViewer.Legend(fields);
        SaleViewer.legend.draw();
    };
};
$(function () {
    SaleViewer.channels = new SaleViewer.Channels();
    SaleViewer.channels.init();
    SaleViewer.dashboard = new SaleViewer.Dashboard("channels");
    SaleViewer.dashboard.init();
});