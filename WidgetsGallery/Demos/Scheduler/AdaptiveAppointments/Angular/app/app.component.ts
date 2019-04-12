import { NgModule, ViewChild, Component, enableProdMode } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {Appointment, Resource, Service} from './app.service';
import {DxSchedulerModule,
        DxSchedulerComponent,
        DxButtonModule} from 'devextreme-angular';
import Query from 'devextreme/data/query';

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
    @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;

    appointmentsData: Appointment[];
    currentDate: Date = new Date(2017, 4, 25);
    resourcesData: Resource[];

    constructor(service: Service) {
        this.appointmentsData = service.getAppointments();
        this.resourcesData = service.getResources();
    }

    getAppointmentColor(id) {
        const data = Query(this.resourcesData)
            .filter(["id", "=", id])
            .toArray();
        return data.length ? data[0].color : "";
    }

    deleteAppointment(appointment) {
        this.scheduler.instance.deleteAppointment(appointment);
    }

    onAppointmentDeleted() {
        this.scheduler.instance.hideAppointmentTooltip()
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxSchedulerModule,
        DxButtonModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
