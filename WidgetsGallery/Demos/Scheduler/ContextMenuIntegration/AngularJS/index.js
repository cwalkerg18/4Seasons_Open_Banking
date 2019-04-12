var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.groups = undefined;
    $scope.crossScrolling = false;
    $scope.currentDate = new Date(2017, 4, 25);

    $scope.contextMenuCellData = {};
    $scope.contextMenuAppointmentData = {};
    $scope.contextMenuTargetedAppointmentData = {};

    $scope.cellContextMenuItems = [
        { text: 'New Appointment', onItemClick: createAppointment },
        { text: 'New Recurring Appointment', onItemClick: createRecurringAppointment },
        { text: 'Group by Room/Ungroup', beginGroup: true, onItemClick: groupCell },
        { text: 'Go to Today', onItemClick: showCurrentDate }
    ];

    $scope.appointmentContextMenuItems = [
        { text: 'Open', onItemClick: showAppointment },
        { text: 'Delete', onItemClick: deleteAppointment },
        { text: 'Repeat Weekly', beginGroup: true, onItemClick: repeatAppointmentWeekly },
        { text: 'Set Room', beginGroup: true, disabled: true }
    ];

    var roomsData = resourcesData;
    $.each(roomsData, function(i, item) {
        item.onItemClick = setResource;
    });

    $scope.appointmentContextMenuItems = $.merge($scope.appointmentContextMenuItems, roomsData);


    $scope.cellContextMenuOptions = {
        target: ".dx-scheduler-date-table-cell",
        dataSource: $scope.cellContextMenuItems,
        width: 200,
        onItemClick: function(e) {
            e.itemData.onItemClick(e.itemData);
        }
    };

    $scope.appointmentContextMenuOptions = {
        target: ".dx-scheduler-appointment",
        dataSource: $scope.appointmentContextMenuItems,
        width: 200,
        itemTemplate: "item-template",
        onItemClick: function(e) {
            e.itemData.onItemClick(e.itemData);
        }
    };

    $scope.schedulerOptions = {
        bindingOptions: {
            groups: "groups",
            crossScrollingEnabled: "crossScrolling",
            currentDate: "currentDate"
        },
        dataSource: data,
        views: ["day", "month"],
        currentView: "month",
        currentDate: new Date(2017, 4, 28),
        firstDayOfWeek: 1,
        startDayHour: 9,
        recurrenceEditMode: "series",
        onAppointmentContextMenu: function(e) {
            $scope.contextMenuTargetedAppointmentData = e.targetedAppointmentData;
            $scope.contextMenuAppointmentData = e.appointmentData;
        },
        onCellContextMenu: function(e) {
            $scope.contextMenuCellData = e.cellData;
        },
        resources: [{
            fieldExpr: "roomId",
            dataSource: resourcesData,
            label: "Room"
        }],
        height: 600
    };

    function createAppointment(e) {
        var scheduler = $('#scheduler').dxScheduler('instance');
        scheduler.showAppointmentPopup({
            startDate: $scope.contextMenuCellData.startDate
        }, true);
    }

    function createRecurringAppointment(e) {
        var scheduler = $('#scheduler').dxScheduler('instance');

        scheduler.showAppointmentPopup({
            startDate: $scope.contextMenuCellData.startDate,
            recurrenceRule: "FREQ=DAILY"
        }, true);
    }

    function groupCell(e) {
        if($scope.groups && $scope.groups.length) {
            $scope.crossScrolling = false;
            $scope.groups = undefined;
        } else {
            $scope.crossScrolling = true;
            $scope.groups = ["roomId"];
        }
    }

    function showCurrentDate(e) {
        $scope.currentDate = new Date();
    }

     function showAppointment(e) {
        var scheduler = $('#scheduler').dxScheduler('instance');
        scheduler.showAppointmentPopup($scope.contextMenuAppointmentData);
    }

    function deleteAppointment(e) {
        var scheduler = $('#scheduler').dxScheduler('instance');

        scheduler.deleteAppointment($scope.contextMenuAppointmentData);
    }

    function repeatAppointmentWeekly(e) {
        var scheduler = $('#scheduler').dxScheduler('instance');

        scheduler.updateAppointment($scope.contextMenuAppointmentData, $.extend($scope.contextMenuAppointmentData, {
            startDate: $scope.contextMenuTargetedAppointmentData.startDate,
            recurrenceRule: "FREQ=WEEKLY"
        }));
    }

    function setResource(itemData) {
        var scheduler = $('#scheduler').dxScheduler('instance');

        scheduler.updateAppointment($scope.contextMenuAppointmentData, $.extend($scope.contextMenuAppointmentData, {
            roomId: [itemData.id]
        }));
    }
});