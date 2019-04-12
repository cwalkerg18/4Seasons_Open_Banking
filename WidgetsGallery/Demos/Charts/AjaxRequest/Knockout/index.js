window.onload = function() {
    var viewModel = {
        chartOptions: {
            rotated: true,
            dataSource: "../../../../data/simpleJSON.json",
            series: {
                label: {
                    visible: true,
                    backgroundColor: "#c18e92"
                },
                color: "#79cac4",
                type: "bar",
                argumentField: "day",
                valueField: "sales"
            },
            title: "Daily Sales",
            argumentAxis: {
                label: {
                    customizeText: function() {
                        return "Day " + this.valueText;
                    }
                }
            },
            valueAxis: {
                label: {
                    visible: false
                }
            },
            "export": {
                enabled: true
            },
            legend: {
                visible: false
            }
        }
    };
    
    ko.applyBindings(viewModel, document.getElementById("chart-demo"));
};