$(function(){
    var checkedItems = [];
    
    $("#selection-treeview").dxTreeView({ 
        items: products,
        width: 320,
        showCheckBoxesMode: "normal",
        onItemSelectionChanged: function(e) {
            var item = e.node;
    
            if(isProduct(item)) {
                processProduct($.extend({
                    category: item.parent.text
                }, item));
            } else {
                $.each(item.items, function(index, product) {
                    processProduct($.extend({
                        category: item.text
                    }, product));
                });
            }
            checkedItemsList.option("items", checkedItems);
        },
        itemTemplate: function(data) {
            return "<div>" + data.text + 
                ((data.price) ? (" ($" + data.price + ")") : "") + 
                "</div>";
        }
    });
    
    var checkedItemsList = $("#checked-items").dxList({
        width: 400,
        items: checkedItems,
        itemTemplate: function(data) {
            return "<div>" + data.text + " (" +
                data.category + ") - $" + data.itemData.price + "</div>";
        }
    }).dxList("instance");
    
    function isProduct(data) {
        return !data.items.length;
    }
    
    function processProduct(product) {
        var itemIndex = -1;
    
        $.each(checkedItems, function (index, item) {
            if (item.key === product.key) {
                itemIndex = index;
                return false;
            }
        });
    
        if(product.selected && itemIndex === -1) {
            checkedItems.push(product);
        } else if (!product.selected){
            checkedItems.splice(itemIndex, 1);
        }    
    }
});