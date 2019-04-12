window.onload = function() {
    var locale = getLocale();
    var locales = [
        { name: "English", value: "en" },
        { name: "Deutsch", value: "de" },
        { name: "Русский", value: "ru" }
    ];

    var viewModel = {
        dataGridOptions: {
            dataSource: payments,
            columns: [{
                dataField: "PaymentId",
                allowEditing: false,
                width: "100px"
            }, {
                dataField: "ContactName"
            }, {
                dataField: "CompanyName"
            }, {
                dataField: "Amount",
                dataType: "number",
                format: { type: "currency" }
            }, {
                dataField: "PaymentDate",
                dataType: "date"
            }],
            filterRow: {
                visible: true,
                applyFilter: "auto"
            },
            editing: {
                mode: "popup",
                allowUpdating: true,
                popup: {
                    width: 700,
                    height: 345
                }
            }
        },

        selectBoxOptions: {
            inputAttr: { id: "selectInput" },
            dataSource: locales,
            displayExpr: "name",
            valueExpr: "value",
            value: locale,
            onValueChanged: changeLocale
        }
    };

    function changeLocale(data) {
        setLocale(data.value);
        document.location.reload();
    }

    function getLocale() {
        var locale = sessionStorage.getItem("locale");
        return locale != null ? locale : "en";
    }

    function setLocale(locale) {
        sessionStorage.setItem("locale", locale);
    }

    $.when(
        $.getJSON("https://unpkg.com/cldr-dates-full/main/de/ca-gregorian.json"),
        $.getJSON("https://unpkg.com/cldr-numbers-full/main/de/numbers.json"),
        $.getJSON("https://unpkg.com/cldr-numbers-full/main/de/currencies.json"),
        $.getJSON("https://unpkg.com/cldr-dates-full/main/ru/ca-gregorian.json"),
        $.getJSON("https://unpkg.com/cldr-numbers-full/main/ru/numbers.json"),
        $.getJSON("https://unpkg.com/cldr-numbers-full/main/ru/currencies.json"),
        $.getJSON("https://unpkg.com/cldr-core/supplemental/likelySubtags.json"),
        $.getJSON("https://unpkg.com/cldr-core/supplemental/timeData.json"),
        $.getJSON("https://unpkg.com/cldr-core/supplemental/weekData.json"),
        $.getJSON("https://unpkg.com/cldr-core/supplemental/currencyData.json"),
        $.getJSON("https://unpkg.com/cldr-core/supplemental/numberingSystems.json")
    ).then(function() {
        return [].slice.apply(arguments, [0]).map(function(result) {
            return result[0];
        });
    }).then(
        Globalize.load
    ).then(function() {
        Globalize.locale(getLocale());
        ko.applyBindings(viewModel, $("#demo-container")[0]);
    });
};