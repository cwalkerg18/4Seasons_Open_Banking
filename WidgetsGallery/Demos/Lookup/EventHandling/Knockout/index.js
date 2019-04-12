window.onload = function() {
    var viewModel = {
        selectedEmployee: ko.observable(),
        lookupOptions: {
            items: employees,
            displayExpr: function(item) {
                if(!item) {
                    return "";
                }

                return item.FirstName + " " + item.LastName;
            },
            placeholder: "Select employee",
            showPopupTitle: false,
            onValueChanged: function(e) {
                e.model.selectedEmployee(e.value);
            }
        }
    };

    ko.applyBindings(viewModel, document.getElementById("demo"));
};