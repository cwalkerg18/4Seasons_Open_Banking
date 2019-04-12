var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.employees = employees;
    
    $scope.rangeSelectorOptions = {
        margin: {
            top: 20
        },
        size: {
            height: 140
        },
        dataSource: employees,
        dataSourceField: "BirthYear",
        scale: {
            tickInterval: 1,
            minorTickInterval: 1,
            label: {
                format: {
                    type: "decimal"
                }
            }
        },
        behavior: {
            callValueChanged: "onMoving"
        },
        title: "Filter Employee List by Birth Year",
        onValueChanged: function (e) {
            var selectedEmployees = $.grep(employees, function(employee) {
                return employee.BirthYear >= e.value[0] && employee.BirthYear <= e.value[1];
            });
            $scope.employees = selectedEmployees;
        }
    };
});