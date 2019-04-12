$(function(){
    var orders = new DevExpress.data.CustomStore({
        load: function (loadOptions) {
            var deferred = $.Deferred(),
                args = {};
    
            if (loadOptions.sort) {
                args.orderby = loadOptions.sort[0].selector;
                if (loadOptions.sort[0].desc)
                    args.orderby += " desc";
            }
    
            args.skip = loadOptions.skip;
            args.take = loadOptions.take;
    
            $.ajax({
                url: "https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems",
                dataType: "json",
                data: args,
                success: function(result) {
                    deferred.resolve(result.items, { totalCount: result.totalCount });
                },
                error: function() {
                    deferred.reject("Data Loading Error");
                },
                timeout: 5000
            });
    
            return deferred.promise();
        }
    });
    
    $("#gridContainer").dxDataGrid({
        dataSource: {
            store: orders
        },
        showBorders: true,
        remoteOperations: {
            sorting: true,
            paging: true
        },
        paging: {
            pageSize: 12
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [8, 12, 20]
        },
        columns: [
            "OrderNumber", "OrderDate", "StoreCity", "StoreState", "Employee", {
                dataField: "SaleAmount",
                format: "currency"
            }
        ]
    }).dxDataGrid("instance");
});