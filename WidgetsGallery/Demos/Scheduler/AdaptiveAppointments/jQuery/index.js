$(function(){
    var scheduler = $("#scheduler").dxScheduler({
        dataSource: data,
        views: [{
            type: "month",
            name: "Auto Mode",
            maxAppointmentsPerCell: "auto"
        }, {
            type: "month",
            name: "Unlimited Mode",
            maxAppointmentsPerCell: "unlimited"
        }, {
            type: "month",
            name: "Numeric Mode",
            maxAppointmentsPerCell: 2
        }],
        currentView: "Auto Mode",
        dropDownAppointmentTemplate: function(data) {
            return getAppointmentTemplate(data);
        },
        appointmentTooltipTemplate: function(data) {
            return getAppointmentTemplate(data);
        },
        onAppointmentDeleted: function() {
        	scheduler.hideAppointmentTooltip();
        },
        currentDate: new Date(2017, 4, 25),
        resources: [{
            fieldExpr: "roomId",
            dataSource: resourcesData,
            label: "Room"
        }],
        height: 650
    }).dxScheduler("instance");

    function getAppointmentTemplate(data) {
        var backgroundColorStyle = data.roomId ? "style='background-color:" + getAppointmentColor(data.roomId) + ";'" : "";
        var markup = $("<div class='appointment-content'>" +
                    "<div class='appointment-badge'" + backgroundColorStyle + ">" + data.text[0] +
                    "</div>" +
                    "<div class='appointment-text'>" +
                        data.text +
                    "</div>" + 
                    "<div class='appointment-dates'>" + Globalize.formatDate(data.startDate, { skeleton: "MMMd" }) + 
                        " , " + Globalize.formatDate(data.startDate, { time: "short" }) +
                            " - " + Globalize.formatDate(data.endDate, { time: "short" }) +
                    "</div>" + 
                    "</div>");

        var $button = $("<div>").addClass("delete-appointment").dxButton({
            icon: "trash",
            onClick: function() {
                scheduler.deleteAppointment(data);
            }
        });

        markup.append($button);

        return markup;
    }

    function getAppointmentColor(resourceId) {
        return DevExpress.data.query(resourcesData)
                .filter("id", resourceId)
                .toArray()[0].color;
    }
});