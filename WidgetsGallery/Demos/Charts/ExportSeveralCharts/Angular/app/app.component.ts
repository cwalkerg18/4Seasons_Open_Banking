import { NgModule, Component, ViewChild, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxChartModule, DxPieChartModule, DxChartComponent, DxPieChartComponent, DxButtonModule } from 'devextreme-angular';

import { Service, Medals } from './app.service';
import { getMarkup, exportFromMarkup } from 'devextreme/viz/export';

if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
    selector: 'demo-app',
    providers: [Service],
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})
export class AppComponent {
    @ViewChild(DxChartComponent) chart: DxChartComponent;
    @ViewChild(DxPieChartComponent) pieChart: DxPieChartComponent;
    title: string = "Total Olympic Medals\n in 2008";
    allMedals: Medals[];
    goldMedals: Medals[];

    constructor(service: Service) {
        this.allMedals = service.getAllMedals();
        this.goldMedals = service.getGoldMedals();
    }

    export() {
        var chartInstance = this.chart.instance,
            pieChartInstance = this.pieChart.instance,
            markup = getMarkup([chartInstance, pieChartInstance]),
            pieSize = pieChartInstance.getSize(),
            chartSize = chartInstance.getSize();

        exportFromMarkup(markup, {
            fileName: "chart",
            format: 'PNG',
            height: chartSize.height + pieSize.height,
            width: Math.max(chartSize.width, pieSize.width)
        })
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxChartModule,
        DxPieChartModule,
        DxButtonModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);