window.onload = function() {
    var viewModel = {
        treeMapOptions: {
            dataSource: citiesPopulation,
            title: "The Most Populated Cities by Continents",
            resolveLabelOverflow: "ellipsis",
            tooltip: {
                enabled: true,
                format: "thousands",
                customizeTooltip: function (arg) {
                    var data = arg.node.data,
                        result = null;
    
                    if (arg.node.isLeaf()) {
                        result = "<span class='city'>" + data.name + "</span> (" +
                            data.country + ")<br/>Population: " + arg.valueText;
                    }
    
                    return {
                        text: result
                    };
                }
            },
            size: {
                height: 500
            }
        }
    };
    
    ko.applyBindings(viewModel, document.getElementById("treemap-demo"));
};