var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    var dataSource = new DevExpress.data.DataSource({
        store: data,
        filter: ["startDateTimeZone", locations[0].value]
    });
    
    $scope.currentLocation = locations[0].value;
    
    $scope.schedulerOptions = {
        bindingOptions: { 
            timeZone: "currentLocation"
        },
        dataSource: dataSource,
        views: ["workWeek"],
        currentView: "workWeek",
        currentDate: new Date(2017, 4, 25),
        startDayHour: 8,
        height: 600,
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
    };
    
    $scope.locationSwitcherOptions = {
        bindingOptions: { 
            value: "currentLocation"
        },
        items: locations,
        width: 200,
        displayExpr: "text",
        valueExpr: "value"
    };
    
    $scope.$watch("currentLocation", function(value) {
        dataSource.filter(["startDateTimeZone", value]);
    });
});