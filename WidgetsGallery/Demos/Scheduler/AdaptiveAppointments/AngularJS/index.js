var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.schedulerOptions = {
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
        dropDownAppointmentTemplate: "appointment-template",
        appointmentTooltipTemplate: "appointment-template",
        onAppointmentDeleted: function() {
        	$("#scheduler").dxScheduler("instance").hideAppointmentTooltip();
        },
        currentDate: new Date(2017, 4, 25),
        resources: [{
            fieldExpr: "roomId",
            dataSource: resourcesData,
            label: "Room"
        }],
        height: 650
    };

    $scope.getAppointmentColor = getAppointmentColor; 
    $scope.deleteAppointment = function(appointment) {
        $('#scheduler').dxScheduler('instance').deleteAppointment(appointment);
    };

    function getAppointmentColor(resourceId) {
        var data = DevExpress.data.query(resourcesData)
            .filter("id", resourceId)
            .toArray();
        return data.length ? data[0].color : "";
    }
});