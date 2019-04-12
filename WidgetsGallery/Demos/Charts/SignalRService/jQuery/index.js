$(function(){
    $.connection.hub.url = "https://js.devexpress.com/Demos/Mvc/signalr";
    var hub = $.connection.stockTickDataHub;
  
    var store = new DevExpress.data.CustomStore({
        load: function() {
            return hub.server.getAllData();
        },
        key: "Date"
    });

    hub.client.updateStockPrice = function(data) {
        store.push([{ type: "insert", key: data.Date, data: data }]);
    };

    $.connection.hub.start({ waitForPageLoad: false }).done(function() {
        $("#chart").dxChart({
            dataSource: store,
            margin: {
                right: 30
            },
            loadingIndicator: {
                show: true
            },
            title: "Stock Price",
            series: [{
                argumentField: "Date",
                type: "candlestick",
                aggregation: {
                    enabled: true,
                    method: "custom",
                    calculate: function(e) {
                        var prices = e.data.map(function(i) {
                            return i.Price;
                        });
                        if (prices.length) {
                            return {
                                Date: e.intervalStart,
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
        });
    });
});
