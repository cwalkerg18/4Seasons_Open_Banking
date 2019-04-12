var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.singleButtonGroupOptions = {
        items: alignments,
        keyExpr: "alignment",
        stylingMode: "outlined"
    };

    $scope.multipleButtonGroupOptions = {
        items: fontStyles,
        keyExpr: "style",
        stylingMode: "outlined",
        selectionMode: "multiple"
    };

    $scope.singleStylingModeButtonGroupOptions = {
        items: alignments,
        keyExpr: "alignment",
        stylingMode: "text"
    };

    $scope.multipleStylingModeButtonGroupOptions = {
        items: fontStyles,
        keyExpr: "style",
        stylingMode: "text",
        selectionMode: "multiple"
    };
});
