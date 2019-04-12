var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {    
    $scope.lookupOptions = {
        items: employeesList,
        value: employeesList[0],
        showPopupTitle: false
    }; 

    $scope.lookupGroupedOptions = {
        dataSource: new DevExpress.data.DataSource({ 
            store: employeesTasks, 
            key: "ID", 
            group: "Assigned"
        }),
        grouped: true,
        closeOnOutsideClick: true,
        showPopupTitle: false,
        displayExpr: "Subject"
    };   
});