$(function(){
    var showEmployees = function(employees) {
            var tableHtml;
    
            if ($('#selectedEmployees').length === 0) {
                $('#range-selector-demo').append("<center><h2>Selected Employees</h2> <div id='selectedEmployees' /></center>");
            }
            $('#selectedEmployees').empty();
            tableHtml = '<table><tr>';
            $.each(['First Name', 'Last Name', 'Birth Year', 'City', 'Title'], function () {
                tableHtml += '<td><b>' + this + '</b></td>';
            });
            tableHtml += '</tr>';
            $.each(employees, function () {
                tableHtml += '<tr><td>' + this.FirstName + '</td><td>' + this.LastName + '</td><td>' + this.BirthYear + '</td><td>' + this.City + '</td><td>' + this.Title + '</td></tr>';
            });
            tableHtml += '</table>';
            $('#selectedEmployees').html(tableHtml);
    };
    
    $("#range-selector-demo").dxRangeSelector({
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
            showEmployees(selectedEmployees);
        }
    });
    
    showEmployees(employees);
});