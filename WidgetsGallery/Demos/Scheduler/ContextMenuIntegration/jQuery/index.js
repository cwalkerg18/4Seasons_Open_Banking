$(function() {

    $("#scheduler").dxScheduler({
        dataSource: data,
        views: ["day", "month"],
        currentView: "month",
        currentDate: new Date(2017, 4, 25),
        firstDayOfWeek: 1,
        startDayHour: 9,
        groups: undefined,
        recurrenceEditMode: "series",
        onAppointmentContextMenu: function(e) {
            var contextMenuEvent = e;

            $("#appointment-context-menu").dxContextMenu({
                dataSource: appointmentContextMenuItems,
                width: 200,
                target: ".dx-scheduler-appointment",
                itemTemplate: function(itemData) {
                    var template = getAppointmentMenuTemplate(itemData);
                    return template;
                },
                onItemClick: function(e) {
                    if(!e.itemData.items && e.itemData.onItemClick) {
                        e.itemData.onItemClick(contextMenuEvent, e);
                    }
                }
            });

        },
        onCellContextMenu: function(e) {
            var contextMenuEvent = e;

            $("#context-menu").dxContextMenu({
                dataSource: cellContextMenuItems,
                width: 200,
                target: ".dx-scheduler-date-table-cell",
                onItemClick: function(e) {
                    e.itemData.onItemClick(contextMenuEvent);
                }
            });
        },
        resources: [{
            fieldExpr: "roomId",
            dataSource: resourcesData,
            label: "Room"
        }],
        height: 600
    });
    
    var createAppointment = function(e) {
        var scheduler = e.component,
            data = e.cellData;

        scheduler.showAppointmentPopup({
            startDate: data.startDate
        }, true);
    };

    var createRecurringAppointment = function(e) {
        var scheduler = e.component,
            data = e.cellData;

        scheduler.showAppointmentPopup({
            startDate: data.startDate,
            recurrenceRule: "FREQ=DAILY"
        }, true);
    };

    var groupCell = function(e) {
        var scheduler = e.component;

        if(scheduler.option("groups")) {
            scheduler.option("crossScrollingEnabled", false);
            scheduler.option("groups", undefined);
        } else {
            scheduler.option("crossScrollingEnabled", true);
            scheduler.option("groups", ["roomId"]);
        }
    };

    var showCurrentDate = function(e) {
        var scheduler = e.component;

        scheduler.option("currentDate", new Date());
    };

    var showAppointment = function(e) {
        var scheduler = e.component,
            itemData = e.appointmentData;

        scheduler.showAppointmentPopup(itemData);
    };

    var deleteAppointment = function(e) {
        var scheduler = e.component,
            itemData = e.appointmentData;

        scheduler.deleteAppointment(itemData);
    };

    var repeatAppointmentWeekly = function(e) {
        var scheduler = e.component,
            itemData = e.appointmentData,
            targetedAppointmentData = e.targetedAppointmentData;

        scheduler.updateAppointment(itemData, $.extend(itemData, {
            startDate: targetedAppointmentData.startDate,
            recurrenceRule: "FREQ=WEEKLY"
        }));
    };

    var setResource = function(e, clickEvent) {
        var scheduler = e.component,
            itemData = e.appointmentData;

        scheduler.updateAppointment(itemData, $.extend(itemData, {
            roomId: [clickEvent.itemData.id]
        }));
    };

    var cellContextMenuItems = [
        { text: 'New Appointment', onItemClick: createAppointment },
        { text: 'New Recurring Appointment', onItemClick: createRecurringAppointment },
        { text: 'Group by Room/Ungroup', beginGroup: true, onItemClick: groupCell },
        { text: 'Go to Today', onItemClick: showCurrentDate }
    ];

    var appointmentContextMenuItems = [
        { text: 'Open', onItemClick: showAppointment },
        { text: 'Delete', onItemClick: deleteAppointment },
        { text: 'Repeat Weekly', beginGroup: true, onItemClick: repeatAppointmentWeekly },
        { text: 'Set Room', beginGroup: true, disabled: true }
    ];

    var getAppointmentMenuTemplate = function(itemData) {

        var template = $('<div></div>');

        if(itemData.color) {
            template.append("<div class='item-badge' style='background-color:" + itemData.color + ";'></div>");
        }

        template.append(itemData.text);

        if(itemData.text === "New Appointment until the end of the week") {
            template.append('<hr />');
        }

        return template;
    };


    var roomsData = resourcesData;
    $.each(roomsData, function (i, item) {
        item.onItemClick = setResource;
    });

    appointmentContextMenuItems = $.merge(appointmentContextMenuItems, roomsData);
});