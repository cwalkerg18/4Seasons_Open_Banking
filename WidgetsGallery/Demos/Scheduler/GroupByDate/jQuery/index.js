$(function(){   
    var groupByDate = $("#groupByDate").dxSwitch({
        value: true,
        onValueChanged: function(args) {
            scheduler.option("groupByDate", args.value);
        }
    }).dxSwitch("instance"); 

    var scheduler = $("#scheduler").dxScheduler({
        dataSource: data,
        views: [{
            type: "week",
            name: "Week"
        }, {
            type: "month",
            name: "Month"
        },
        {
            type: "timelineWeek",
            name: "Timeline Week",
            groupOrientation: "horizontal",
            cellDuration: 60
        }],
        currentView: "Week",
        crossScrollingEnabled: true,
        groupByDate: groupByDate.option("value"),
        currentDate: new Date(2018, 4, 21),
        startDayHour: 9,
        endDayHour: 16,
        groups: ["priorityId"],
        resources: [
            { 
                 fieldExpr: "priorityId", 
                 allowMultiple: false, 
                 dataSource: priorityData,
                 label: "Priority"
            }
        ],
        height: 700
    }).dxScheduler("instance");
});