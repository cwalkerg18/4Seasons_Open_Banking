import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxSchedulerModule, DxSelectBoxModule, DxTemplateModule } from 'devextreme-angular';
import { Service, Location } from './app.service';

import DataSource from 'devextreme/data/data_source';

if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    providers: [Service],
    preserveWhitespaces: true
})
export class AppComponent {

    dataSource: any;
    currentDate: Date = new Date(2017, 4, 25);
    currentLocation: any;
    locations: Location[];

    constructor(service: Service) {
        this.locations = service.getLocations();
        this.currentLocation = this.locations[0].value;

        this.dataSource = new DataSource({
            store: service.getData(),
            filter: ["startDateTimeZone", this.currentLocation]
        });
    }

    onAppointmentFormOpening(e) {
        e.form.itemOption("startDateTimeZone", { visible: true });
        e.form.itemOption("endDateTimeZone", { visible: true });
    }

    onValueChanged(e) {
        this.dataSource.filter(["startDateTimeZone", e.value]);
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxSchedulerModule,
        DxTemplateModule,
        DxSelectBoxModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);