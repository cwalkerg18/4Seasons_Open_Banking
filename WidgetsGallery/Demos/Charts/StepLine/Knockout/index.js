window.onload = function() {
    var viewModel = {
        chartOptions: {
            title: "Australian Olympic Medal Count",
            dataSource: dataSource,
            commonSeriesSettings: {
                type: "stepline",
                argumentField: "year",
                stepline: {
                    point: {
                        visible: false
                    }
                }
            },
            series: [
                { valueField: "bronze", name: "Bronze Medals", color: "#cd7f32" },
                { valueField: "silver", name: "Silver Medals", color: "#c0c0c0" },
                { valueField: "gold", name: "Gold Medals", color: "#ffd700" }
            ],
            "export": {
                enabled: true
            },
            argumentAxis: {
                label: {
                    format: {
                        type: "decimal"
                    }
                }
            },
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center"
            }
        }
    };
    
    ko.applyBindings(viewModel, document.getElementById("chart-demo"));
};