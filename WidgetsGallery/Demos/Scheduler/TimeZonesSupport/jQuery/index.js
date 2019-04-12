$(function(){
    var dataSource = new DevExpress.data.DataSource({
        store: data,
        filter: ["startDateTimeZone", locations[0].value]
    });
    
    var scheduler = $("#scheduler").dxScheduler({
        dataSource: dataSource,
        views: ["workWeek"],
        currentView: "workWeek",
        currentDate: new Date(2017, 4, 25),
        startDayHour: 8,
        height: 600,
        timeZone: locations[0].value,
        resources: [
            {
                fieldExpr: "startDateTimeZone",
                valueExpr: "value",
                dataSource: locations
            }
        ],
        onAppointmentFormOpening: function(e){
            e.form.itemOption("startDateTimeZone", { visible: true });
            e.form.itemOption("endDateTimeZone", { visible: true });
        }
    }).dxScheduler("instance");
    
    $("#location-switcher").dxSelectBox({
        items: locations,
        width: 200,
        value: locations[0].value,
        displayExpr: "text",
        valueExpr: "value",
        onValueChanged: function(data) {
            dataSource.filter(["startDateTimeZone", data.value]);
            scheduler.option("timeZone", data.value);
        }
    });
});