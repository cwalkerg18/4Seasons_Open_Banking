import { NgModule, Component, enableProdMode } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxVectorMapModule, DxPieChartModule } from 'devextreme-angular';

import DxPieChart from 'devextreme/viz/pie_chart';
import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
import { GdpInfo, Service } from './app.service';

if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
    selector: 'demo-app',
    providers: [ Service ],
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})

export class AppComponent {
    worldMap: any = mapsData.world;
    gdpData: Object;
    toolTipData: Object;
    pipe: any = new DecimalPipe("en-US");

    constructor(private service: Service) {
        this.gdpData = service.getCountriesGDP();
        this.customizeTooltip = this.customizeTooltip.bind(this);
        this.customizeLayers = this.customizeLayers.bind(this);
        this.tooltipShown = this.tooltipShown.bind(this);
    }

    customizeTooltip(arg) {
        let countryGDPData = this.gdpData[arg.attribute("name")];
        let total = countryGDPData && countryGDPData.total;
        let totalMarkupString = total ? "<div id='nominal' >Nominal GDP: $" + total + "M</div>" : "";
        let node = "<div #gdp><h4>" + arg.attribute("name") + "</h4>" +
            totalMarkupString +
            "<div id='gdp-sectors'></div></div>";

        return {
            html: node
        };
    }

    customizeLayers(elements) {
        elements.forEach((element) => {
            let countryGDPData = this.gdpData[element.attribute("name")];
            element.attribute("total", countryGDPData && countryGDPData.total || 0);
        });
    }

    customizeText = (arg) => this.pipe.transform(arg.start, "1.0-0") + " to " + this.pipe.transform(arg.end, "1.0-0");

    tooltipShown(e) {
        let name = e.target.attribute("name"),
            gdpData: GdpInfo[] = this.gdpData[name] ? [
                { name: "industry", value: this.gdpData[name].industry },
                { name: "services", value: this.gdpData[name].services },
                { name: "agriculture", value: this.gdpData[name].agriculture }
            ] : null,
            container = (<any> document).getElementById("gdp-sectors");

        if (this.gdpData[name].services) {
            new DxPieChart(container, this.service.getPieChartConfig(gdpData));
        } else {
            container.textContent = "No economic development data";
        }
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxVectorMapModule,
        DxPieChartModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
