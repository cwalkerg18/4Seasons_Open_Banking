$(function(){
    $("#lookup").dxLookup({
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
            $(".selected").show();
            $("#selected-employee-img").attr("src", e.value.Picture);
            $("#selected-employee-notes").text(e.value.Notes);
        }
    });
});