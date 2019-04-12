$(function() {
    $("#productsSearch").dxSelectBox({
        items: products,
        displayExpr: "Name",
        valueExpr: "ID",
        searchEnabled: true
    });

    $("#productsEditing").dxSelectBox({
        dataSource: new DevExpress.data.DataSource({
            store: simpleProducts
        }),
        value: simpleProducts[0],
        acceptCustomValue: true,
        onValueChanged: function (data) {
            $(".current-value").text(data.value);
        },
        onCustomItemCreating: function(data) {
            var item = data.text;
            var dataSource = data.component.getDataSource();

            data.customItem = item || "";

            if(item) {
                dataSource
                    .store()
                    .load({ filter: ["this", "=", item] })
                    .done(function(items) {
                        if(!items.length) {
                            dataSource.store().insert(item);
                            dataSource.reload();
                        }
                    });
            }
        }
    }).dxSelectBox("instance");
});
