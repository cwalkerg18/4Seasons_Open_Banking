$(function(){
    $("#pie-chart").dxPieChart({
        palette: "bright",
        dataSource: states,
        title: "Top 10 Most Populated States in US",
        series: {
            argumentField: "name",
            valueField: "population",
            tagField: "data"
        },
        "export": {
            enabled: true
        },
        tooltip: {
            enabled: true,
            customizeTooltip: function (args) {
                return {
                    html: "<div class='state-tooltip'><img src='../../../../images/flags/" + 
                    args.point.tag.flag + ".gif' /><h4>" +
                    args.argument + "</h4><div><span class='caption'>Capital</span>: " +
                    args.point.tag.capital +
                    "</div><div><span class='caption'>Population</span>: " +
                    Globalize.formatNumber(args.value, { maximumFractionDigits: 0 }) +
                    " people</div>" + "<div><span class='caption'>Area</span>: " +
                    Globalize.formatNumber(args.point.tag.area, { maximumFractionDigits: 0 }) +
                    " km<sup>2</sup> (" +
                    Globalize.formatNumber(0.3861 * args.point.tag.area, { maximumFractionDigits: 0 }) +
                    " mi<sup>2</sup>)" + "</div>" + "</div>"
                };
            }
        }
    });
});