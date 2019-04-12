import { Component, NgModule, enableProdMode } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {DxButtonGroupModule} from 'devextreme-angular';

import { Alignment, FontStyle, Service } from './app.service';

if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
    selector: 'demo-app',
    providers: [ Service ],
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    preserveWhitespaces: true
})

export class AppComponent {
    alignments: Alignment[];
    fontStyles: FontStyle[];

    constructor(service: Service) {
        this.alignments = service.getAlignments();
        this.fontStyles = service.getFontStyles();
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxButtonGroupModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
