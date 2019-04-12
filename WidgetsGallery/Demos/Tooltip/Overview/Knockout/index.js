window.onload = function() {
    var viewModel = {
        defaultModeOptions: {
            target: '#product1', 
            showEvent: "mouseenter",
            hideEvent: "mouseleave"
        },
        withTemplateOptions: {
            target: "#product2",
            showEvent: "mouseenter",
            hideEvent: "mouseleave",
            position: "right",
            contentTemplate: function(data){
                data.html("<img width='150' src='../../../../images/products/3.png'><br/><b>SuperPlasma 50</b><br/>2400$");
            }
        },
        withAnimationOptions: {
            target: "#product3",
            showEvent: "mouseenter",
            hideEvent: "mouseleave",
            position: "top",
            animation: { 
                show: {
                    type: "slide",
                    from: { 
                        top: -100,
                        opacity: 0
                    },
                    to: {
                        opacity: 1,
                          top: 0 
                    }
                },
                hide: {
                    type: "pop",
                    from: { 
                          scale: 1,
                          opacity: 1
                    },
                    to: {
                        opacity: 0,
                        scale: 0.1 
                    }
                }
            }
        }
    };
    
    ko.applyBindings(viewModel, document.getElementById("tooltip"));
};