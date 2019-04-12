$(function(){
    var mapProviders = [{ 
            key: "bing",
            name: "Bing Map"            
        }, { 
            key: "google",
            name: "Google Dynamic Map"
        }, { 
            key: "googleStatic",
            name: "Google Static Map"
        }];
    
    var mapTypes = [{ 
            key: "roadmap",
            name: "Default Map"
        }, { 
            key: "satellite",
            name: "Photographic Map"
        }, { 
            key: "hybrid",
            name: "Hybrid Map"
        }];
    
    var map = $("#map").dxMap({
        center: "Brooklyn Bridge,New York,NY",
        zoom: 14,
        height: 400,
        width: "100%",
        provider: mapProviders[0].key,
        key: {
            // NOTE: Specify your map API keys for every used provider
            //bing: "YOUR_BING_MAPS_API_KEY",
            //google: "YOUR_GOOGLE_MAPS_API_KEY",
            //googleStatic: "YOUR_GOOGLE_STATIC_MAPS_API_KEY"
        },
        type: mapTypes[0].key
    }).dxMap("instance"); 
    
    $("#choose-provider").dxSelectBox({
        dataSource: mapProviders,
        displayExpr: "name",
        valueExpr: "key",
        value: mapProviders[0].key,
        onValueChanged: function (data) {
            map.option("provider", data.value);
        }
    });
    
    $("#choose-type").dxSelectBox({
        dataSource: mapTypes,
        displayExpr: "name",
        valueExpr: "key",
        value: mapTypes[0].key,
        onValueChanged: function (data) {
            map.option("type", data.value);
        }
    });
});