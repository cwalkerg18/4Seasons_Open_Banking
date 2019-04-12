var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.chartOptions = {
        palette: "soft",
        title:"The Chemical Composition of the Earth Layers",
        valueAxis: {
            label:{
                customizeText: function() {
                    return this.valueText + "%"; 
                }
            }
        },
        dataSource: dataSource,
        series: series,
        commonSeriesSettings: {
            type: "bar",
            ignoreEmptyPoints: true
        },
        legend: {
            border: {
                visible: true
            },
            visible: true,
            verticalAlignment: "top",
            horizontalAlignment: "right",
            orientation:"horizontal"
        }
    };
    
    $scope.rangeOptions = {
        size: {
            height: 120
        },
        margin: {
            left: 10
        },
        scale: {
            minorTickCount: 1
        },
        dataSource: dataSource,
        chart: {
            palette: "soft",
            commonSeriesSettings: {
                type: "bar",
                ignoreEmptyPoints: true
            },
            series: series
        },
        behavior: {
            callValueChanged: "onMoving"
        },
        onValueChanged: function (e) {
            var zoomedChart = $("#chart-demo #zoomedChart").dxChart("instance");
            zoomedChart.getArgumentAxis().visualRange(e.value);
        }
    };
});