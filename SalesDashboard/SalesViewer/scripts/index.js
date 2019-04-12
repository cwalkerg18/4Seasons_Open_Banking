"use strict";

window.SaleViewer = window.SaleViewer || {};

SaleViewer.loadData = function (data, callback, category) {
    $.ajax({
        url: SaleViewer.baseApiUrl + category,
        dataType: "json",
        data: data,
        success: callback
    });
};

SaleViewer.lightColor = "#808080";
SaleViewer.darkColor = "#252525";

$(function () {
    window.SaleViewer.sharedWidgets = new SaleViewer.SharedWidgets();
    window.SaleViewer.sharedWidgets.initPopup();

    DevExpress.viz.registerPalette("SaleViewPalette", {
        simpleSet: ["#da5859", "#f09777", "#fbc987", "#a5d7d0", "#a5bdd7", "#e97c82"],
        indicatingSet: ['#90ba58', '#eeba69', '#a37182'],
        gradientSet: ['#78b6d9', '#eeba69']
    });

});

