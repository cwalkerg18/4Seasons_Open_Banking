window.onload = function() {
    var colCountMiddleSize = ko.observable(4),
        colCountSmallSize = ko.observable(2);
    
    var viewModel = {
        formOptions: {
            formData: employee,
            labelLocation: "top",
            minColWidth: 233,
            colCount: "auto",
            colCountByScreen: {
                md: colCountMiddleSize,
                sm: colCountSmallSize
            },
            screenByWidth: function(width) {
                return width < 720? "sm" : "md";
            }
        },
        useColCountByScreen: {
            onValueChanged: function(e) {
                if(e.value) { 
                    colCountMiddleSize(4);
                    colCountSmallSize(2);
                } else {
                    colCountMiddleSize(undefined);
                    colCountSmallSize(undefined);
                }
            },
            text: "Set the count of columns regardless of screen size",
            value: true
        }
    };
    
    ko.applyBindings(viewModel, document.getElementById("form-container"));
};