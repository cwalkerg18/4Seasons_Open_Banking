var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.selectedEmployee = "none";
        
    $scope.lookupOptions = {
        items: employees,
        displayExpr: function(item) {
            if(!item) {
                return "";
            }

            return item.FirstName + " " + item.LastName;
        },
	    placeholder: "Select employee",
	    showPopupTitle: false,
        onValueChanged: function(data) {
            $scope.selectedEmployee = data.value;
        }
    };
});