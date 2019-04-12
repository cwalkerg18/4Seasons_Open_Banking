import { NgModule, Component, enableProdMode } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

import {
    DxSelectBoxModule
} from 'devextreme-angular';

import {Product, Service} from './app.service';

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
    simpleProducts: DataSource;

    constructor(service: Service) {
        this.simpleProducts = new DataSource({
            store: new ArrayStore({
                data: service.getProducts(), 
                key: "id", 
            }),
            group: "Category"
        });
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxSelectBoxModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);