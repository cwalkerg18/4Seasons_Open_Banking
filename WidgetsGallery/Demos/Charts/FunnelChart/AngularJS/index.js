var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.funnelOptions = {
        dataSource: data,
        title: {
            text: "Website Conversions",
            margin: 30
        },
        argumentField: "argument",
        valueField: "value",
        palette: "Soft Pastel",
        "export": {
            enabled: true
        },
        tooltip: {
            enabled: true,
            format: "fixedPoint"
        },
        item: {
            border: {
                visible: true
            }
        },
        label: {
            visible: true,
            position: "inside",
            backgroundColor: "none",
            customizeText: function(e) {
                return "<span style='font-size: 28px'>" +
                    e.percentText +
                    "</span><br/>" +
                    e.item.argument;
            }
        }
    };
});