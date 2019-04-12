$(function() {
    $("#single-selection").dxButtonGroup({
        items: alignments,
        keyExpr: "alignment",
        stylingMode: "outlined"
    });

    $("#multiple-selection").dxButtonGroup({
        items: fontStyles,
        keyExpr: "style",
        stylingMode: "outlined",
        selectionMode: "multiple"
    });

    $("#single-selection-styling-mode").dxButtonGroup({
        items: alignments,
        keyExpr: "alignment",
        stylingMode: "text"
    });

    $("#multiple-selection-styling-mode").dxButtonGroup({
        items: fontStyles,
        keyExpr: "style",
        stylingMode: "text",
        selectionMode: "multiple"
    });
});
