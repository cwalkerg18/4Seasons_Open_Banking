window.onload = function() {
    var viewModel = {
        polarChartOptions: {
            dataSource: dataSource,
            series: [{ type: "line", valueField: "val", name: "Function"}],
            legend: {
                visible: false        
            },
            commonSeriesSettings: {
                closed: false
            },
            argumentAxis: {
                inverted: true,
                startAngle: 90,
                tickInterval: 45,
                period: 360
            },
            "export": {
                enabled: true
            },
            title: "Archimedean Spiral"
        }
    };
    
    ko.applyBindings(viewModel, document.getElementById("chart-demo"));
};