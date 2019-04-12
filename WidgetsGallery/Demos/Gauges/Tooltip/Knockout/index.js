window.onload = function() {
    var viewModel = {
        barGaugeOptions: {
            startValue: 0,
            endValue: 200,
            values: [121.4, 135.4, 115.9, 141.1, 127.5],
            label: { visible: false },
            tooltip: {
                enabled: true,
                customizeTooltip: function (arg) {
                    return {
                        text: "Racer " + (arg.index + 1) + " - " + arg.valueText + " km/h"
                    };
                }
            },
            "export": {
                enabled: true
            },
            title: {
                text: "Average Speed by Racer",
                font: {
                    size: 28
                }
            }
        }
    };
    
    ko.applyBindings(viewModel, $("#gauge-demo").get(0));
};