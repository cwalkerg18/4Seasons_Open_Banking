window.onload = function() {
    var viewModel = {
        rangeSelectorOptions: {
            margin: {
                top: 50
            },
            size: {
                height: 250
            },
            scale: {
                startValue: new Date(2011, 1, 1),
                endValue: new Date(2011, 6, 1),
                minorTickInterval: "day",
                tickInterval: { days: 7 },
                minRange: "week",
                maxRange: "month",
                minorTick: {
                    visible: false,
                }
            },
            sliderMarker: {
                format: "monthAndDay"
            },
            value: [new Date(2011, 1, 5), new Date(2011, 2, 5)],
            title: "Select a Vacation Period"
        }
    };
    
    ko.applyBindings(viewModel, $("#range-selector-demo").get(0));
};