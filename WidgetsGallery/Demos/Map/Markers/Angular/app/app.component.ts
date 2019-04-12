import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxMapModule, DxCheckBoxModule, DxButtonModule } from 'devextreme-angular';

import { Marker, Service } from './app.service';

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
    customMarkerUrl: string;
    mapMarkerUrl: string;
    markers: Marker[];

    constructor(service: Service) {
        this.customMarkerUrl = this.mapMarkerUrl = service.getMarkerUrl();
        this.markers = service.getMarkers();
    }
    checkCustomMarker(data) {
        this.mapMarkerUrl = data.value ? this.customMarkerUrl : null;
    }
    showTooltips() {
        this.markers = this.markers.map(function (item) {
            item.tooltip.isShown = true;
            return item;
        });
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxMapModule,
        DxCheckBoxModule,
        DxButtonModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
