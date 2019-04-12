$(function(){
    $("#lookupFieldTemplateOption").dxLookup({
        items: employees,
        displayExpr: getDisplayExpr,
        valueExpr: "ID",
        value: employees[0].ID,
        title: "Select employee",
        fieldTemplate: function(data) {
            return  getTemplateMarkup(data, "custom-field");
        }
    });
    
    $("#lookupItemTemplateOptions").dxLookup({
        items: employees,
        searchExpr: ["FirstName", "LastName", "Prefix"],
        valueExpr: "ID",
        displayExpr: getDisplayExpr,
        title: "Select employee",
        placeholder: "Select employee",
        itemTemplate: function(data) {
            return getTemplateMarkup(data, "custom-item");
        }
    });
    
    function getTemplateMarkup(data, containerClass) {
        return "<div class='" + containerClass + "'><img src='" + 
                data.Picture + "' /><div>" + data.Prefix + " " + 
                data.FirstName + " " + data.LastName + "</div></div>";
    }

    function getDisplayExpr(item) {
        if(!item) {
            return "";
        }

        return item.FirstName + " " + item.LastName;
    }
});