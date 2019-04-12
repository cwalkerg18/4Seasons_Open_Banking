$(function(){
    var checkBoxWidget = $("#checkbox").dxCheckBox({
        value: true,
        text: "text"
    }).dxCheckBox("instance");
    
    var switchWidget = $("#switch").dxSwitch({}).dxSwitch("instance");
    
    var textBoxWidget = $("#text-box").dxTextBox({
        showClearButton: true,
        value: "text"
    }).dxTextBox("instance");
    
    var numberBoxWidget = $("#number-box").dxNumberBox({
        showSpinButtons: true,
        value: "123"
    }).dxNumberBox("instance");
    
    var selectBoxWidget = $("#select-box").dxSelectBox({
        items: europeanUnion,
        value: europeanUnion[0].id,
        displayExpr: "nameEn",
        valueExpr: "id"
    }).dxSelectBox("instance");
    
    var tagBoxWidget = $("#tag-box").dxTagBox({
        items: europeanUnion,
        value: [europeanUnion[0].id],
        placeholder: "...",
        displayExpr: "nameEn",
        valueExpr: "id"
    }).dxTagBox("instance");
    
    var textAreaWidget = $("#text-area").dxTextArea({
        value: "text"
    }).dxTextArea("instance");
    
    var autocompleteWidget = $("#autocomplete").dxAutocomplete({
        items: europeanUnion,
        valueExpr: "nameEn"
    }).dxAutocomplete("instance");
    
    var languages = ["Arabic: Right-to-Left direction", "English: Left-to-Right direction"];
    
    $("#select-language").dxSelectBox({
        items: languages,
        value: languages[1],
        onValueChanged: function(data) {

            var rtl = data.value === languages[0];
            var text = rtl ? "نص" : "text";
            var expression = rtl ? "nameAr" : "nameEn";

            $("#form").toggleClass("dx-rtl", rtl);

            DevExpress.config({ rtlEnabled: rtl });

            checkBoxWidget.option("text", text);
            textBoxWidget.option("value", text);
            textAreaWidget.option("value", text);
            selectBoxWidget.option("displayExpr", expression);
            tagBoxWidget.option("displayExpr", expression);
            autocompleteWidget.option("value", "");
            autocompleteWidget.option("valueExpr", expression);
        }
    });
});