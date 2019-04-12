var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.vectorMapOptions = {
        layers: [{
            name: "areas",
            dataSource: DevExpress.viz.map.sources.world,
            palette:"Violet",
            colorGroups: [0, 0.5, 0.8, 1, 2, 3, 100],
            colorGroupingField: "population",
            label: {
                enabled: true,
                dataField: "name"
            },
            customize: function (elements) {
                elements.forEach(function (element) {
                    var name = element.attribute("name"),
                        population = populations[name];
                    if (population) {
                        element.attribute("population", population);
                    }                
                });
            }
        }, {
            name: "markers",
            dataSource: markers,
            elementType: "bubble",
            dataField: "value",
            sizeGroups: [0, 8000, 10000, 50000],
            opacity: 0.8,
            label: {
                enabled: false
            }                        
        }],
        tooltip: {
            enabled: true,
            customizeTooltip: function (arg) {
                 return { text: arg.attribute("text") };
            }        
        },    
        legends: [{
            source: { layer: "areas", grouping: "color" },
            horizontalAlignment: "left",
            verticalAlignment: "bottom",
            customizeText: function (arg) {
                if (arg.index === 0) {
                    return "< 0.5%";
                }
                else if (arg.index === 5) {
                    return "> 3%";
                }
                else {
                    return arg.start + "% to " + arg.end + "%";
                }
            }
        }, {
            source: { layer: "markers", grouping: "size" },
            markerShape: "circle",
            horizontalAlignment: "left",
            verticalAlignment: "bottom",
            customizeText: function (arg) {
                return ["< 8000K", "8000K to 10000K", "> 10000K"][arg.index];
            }
        }],
        bounds: [-180, 85, 180, -75]
    };
});