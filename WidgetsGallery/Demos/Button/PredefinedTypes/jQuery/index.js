$(function() {
    var options = [
        { text: "OK", type: "normal" },
        { text: "Apply", type: "success" },
        { text: "Done", type: "default" },
        { text: "Delete", type: "danger" }
    ];

    var modes = [ "contained", "outlined", "text" ];

    var container = $(".buttons");

    modes.forEach(function(mode) {
        options.forEach(function(buttonOptions) {
            var wrapper = $("<div>");
            var buttonContainer = $("<div>");

            container.append(wrapper.append(buttonContainer));

            buttonContainer.dxButton({
                stylingMode: mode,
                text: buttonOptions.text,
                type: buttonOptions.type,
                width: 90,
                onClick: function() { 
                    DevExpress.ui.notify("The " + buttonOptions.text + " button was clicked");
                }
            });
        });
    });
});
