var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    var baseOptions = [
        { text: "OK", type: "normal" },
        { text: "Apply", type: "success" },
        { text: "Done", type: "default" },
        { text: "Delete", type: "danger" }
    ];

    var modes = [ "contained", "outlined", "text" ];

    var buttonOptions = [];
    modes.forEach(function(mode) {
        baseOptions.forEach(function(options) {
            buttonOptions.push({
                stylingMode: mode,
                text: options.text,
                type: options.type,
                width: 90,
                onClick: function() { 
                    DevExpress.ui.notify("The " + options.text + " button was clicked");
                }
            });
        });
    });

    $scope.buttonOptions = buttonOptions;
});
