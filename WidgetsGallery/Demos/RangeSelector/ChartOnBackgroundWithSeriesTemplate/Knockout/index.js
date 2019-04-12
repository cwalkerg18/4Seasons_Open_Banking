window.onload = function() {
    var viewModel = {
        rangeSelectorOptions: {
            dataSource: dataSource,
            margin: {
                top: 50
            },
            size: {
                height: 310
            },
            chart: {
                commonSeriesSettings: {
                    argumentField: "year",
                    valueField: "oil",
                    type: "spline"
                },
                seriesTemplate: {
                    nameField: "country",
                    customizeSeries: function (valueFromNameField) {
                        return valueFromNameField === "USA" ? { color: "red" } : {};
                    }
                }
            },
            scale: {
                label: {
                    format: {
                        type: "decimal"
                    }
                }
            },
            title: "Select a Year Period"
        }
    };
    
    ko.applyBindings(viewModel, $("#range-selector-demo").get(0));
};