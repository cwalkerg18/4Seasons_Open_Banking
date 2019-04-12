import { NgModule, Component, enableProdMode } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxPieChartModule } from 'devextreme-angular';

import { Service, State } from './app.service';

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
    populationData: State[];
    pipe: any = new DecimalPipe("en-US");

    constructor(service: Service) {
        this.populationData = service.getPopulationData();
    }

    customizeTooltip = (args: any) => {
        return {
            html: "<div class='state-tooltip'><img src='../../../../images/flags/" + 
            args.point.tag.flag + ".gif' /><h4>" +
            args.argument + "</h4><div><span class='caption'>Capital</span>: " +
            args.point.tag.capital +
            "</div><div><span class='caption'>Population</span>: " +
            this.pipe.transform(args.value, "3.0-0") +
            " people</div>" + "<div><span class='caption'>Area</span>: " +
            this.pipe.transform(args.point.tag.area, "3.0-0") +
            " km<sup>2</sup> (" +
            this.pipe.transform(0.3861 * args.point.tag.area, "3.0-0") +
            " mi<sup>2</sup>)" + "</div>" + "</div>"
        };
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxPieChartModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);