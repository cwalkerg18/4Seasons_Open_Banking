window.onload = function() {
    var viewModel = {
        singleButtonGroupOptions: {
            items: alignments,
            keyExpr: "alignment",
            stylingMode: "outlined"
        },

        multipleButtonGroupOptions: {
            items: fontStyles,
            keyExpr: "style",
            stylingMode: "outlined",
            selectionMode: "multiple"
        },

        singleStylingModeButtonGroupOptions: {
            items: alignments,
            keyExpr: "alignment",
            stylingMode: "text"
        },

        multipleStylingModeButtonGroupOptions: {
            items: fontStyles,
            keyExpr: "style",
            stylingMode: "text",
            selectionMode: "multiple"
        }
    };

    ko.applyBindings(viewModel, document.getElementById("demo"));
};
