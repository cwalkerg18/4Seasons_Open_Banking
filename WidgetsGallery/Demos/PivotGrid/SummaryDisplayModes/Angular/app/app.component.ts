import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxPivotGridModule } from 'devextreme-angular';
import { Service, Sale } from './app.service';

import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    providers: [Service]
})
export class AppComponent {
    pivotGridDataSource: any;
    summaryDisplayModes: any[] = [
        { text: "None", value: "none" },
        { text: "Absolute Variation", value: "absoluteVariation" },
        { text: "Percent Variation", value: "percentVariation" },
        { text: "Percent of Column Total", value: "percentOfColumnTotal" },
        { text: "Percent of Row Total", value: "percentOfRowTotal" },
        { text: "Percent of Column Grand Total", value: "percentOfColumnGrandTotal" },
        { text: "Percent of Row Grand Total", value: "percentOfRowGrandTotal" },
        { text: "Percent of Grand Total", value: "percentOfGrandTotal" }
    ];

    constructor(service: Service) {
        this.pivotGridDataSource = new PivotGridDataSource({
            fields: [{
                caption: "Region",
                width: 120,
                dataField: "region",
                area: "row"
            }, {
                caption: "City",
                dataField: "city",
                width: 150,
                area: "row"
            }, {
                dataField: "date",
                dataType: "date",
                area: "column"
            }, {
                groupName: "date",
                groupInterval: "year",
                expanded: true
            }, {
                caption: "Relative Sales",
                dataField: "amount",
                dataType: "number",
                summaryType: "sum",
                area: "data",
                summaryDisplayMode: "percentOfColumnGrandTotal"
            }],
            store: service.getSales()
        });
    }

    prepareContextMenu(e) {
        if (e.field !== this.pivotGridDataSource.field(4))
            return;
        let dataSource:any = this.pivotGridDataSource;
        for (let summaryDisplayMode of this.summaryDisplayModes) {
            var summaryDisplayModeValue = summaryDisplayMode.value;

            e.items.push({
                text: summaryDisplayMode.text,
                selected: e.field.summaryDisplayMode === summaryDisplayModeValue,
                onItemClick: function (args) {
                    var format,
                        caption = summaryDisplayModeValue === "none" ? "Total Sales" : "Relative Sales";
                    if (summaryDisplayModeValue === "none"
                        || summaryDisplayModeValue === "absoluteVariation") {
                        format = "currency";
                    }
                    dataSource.field(4, {
                        summaryDisplayMode: summaryDisplayModeValue,
                        format: format,
                        caption: caption
                    });

                    dataSource.load();
                }
            });
        };
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxPivotGridModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);