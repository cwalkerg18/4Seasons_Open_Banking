var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.vectorMapOptions = {
        layers: [{
            dataSource: DevExpress.viz.map.sources.world,
            hoverEnabled: false
        }, {
            name: "bubbles",
            dataSource: markers,
            elementType: "bubble",
            dataField: "value",
            minSize: 20,
            maxSize: 40,
            sizeGroups: [0, 8000, 10000, 50000],
            opacity: 0.8
        }],
        tooltip: {
            enabled: true,
            customizeTooltip: function (arg) {
                if (arg.layer.type === "marker") {
                    return { text: arg.attribute("tooltip") };
                }
            }
        },
        legends: [{
            source: { layer: "bubbles", grouping: "size" },
            markerShape: "circle",
            customizeText: function (arg) {
                return ["< 8000K", "8000K to 10000K", "> 10000K"][arg.index];
            }
        }],
        bounds: [-180, 85, 180, -60]
    };
});