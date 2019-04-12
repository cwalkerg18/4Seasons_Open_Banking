var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    var store = new DevExpress.data.CustomStore({
        load: function() {
            return connection.invoke("getAllData");
        },
        key: "date"
    });

    $scope.chartOptions = {
        dataSource: {
            store: store
        },
        margin: {
            right: 30
        },
        loadingIndicator: {
            show: true
        },
        title: "Stock Price",
        series: [{
            argumentField: "date",
            type: "candlestick",
            aggregation: {
                enabled: true,
                method: "custom",
                calculate: function(e) {
                    var prices = e.data.map(function(i) {
                        return i.price;
                    });
                    if (prices.length) {
                        return {
                            date: e.intervalStart,
                            open: prices[0],
                            high: Math.max.apply(null, prices),
                            low: Math.min.apply(null, prices),
                            close: prices[prices.length - 1]
                        };
                    }
                }
            }
        }],
        zoomAndPan: {
            argumentAxis: "both"
        },
        scrollBar: {
            visible: true
        },
        legend: {
            visible: false
        },
        argumentAxis: {
            argumentType: "datetime",
            valueMarginsEnabled: false,
            visualRangeUpdateMode: "auto",
            visualRange: {
                length: "hour"
            }
        },
        valueAxis: {
            placeholderSize: 50
        },
        onZoomEnd: function(e) {
            if (e.range.endValue - e.range.startValue < 1000 * 60 * 10) {
                e.cancel = true;
            }
        }
    };

    $scope.connectionStarted = false;

    var connection = new signalR.HubConnectionBuilder()
        .withUrl("https://js.devexpress.com/Demos/NetCore/stockTickDataHub")
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connection.start()
        .then(function () {
            connection.on("updateStockPrice", function (data) {
                store.push([{ type: "insert", key: data.date, data: data }]);
            });
            $scope.connectionStarted = true;
            $scope.$apply();
        });
});
