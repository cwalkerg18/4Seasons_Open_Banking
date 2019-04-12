var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.chartOptions = {
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
    };
});