import { Component, NgModule, enableProdMode } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {DxButtonModule} from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})

export class AppComponent {
    baseOptions: Array<any> = [
        { text: "OK", type: "normal" },
        { text: "Apply", type: "success" },
        { text: "Done", type: "default" },
        { text: "Delete", type: "danger" }
    ];

    modes: Array<string> = [ "contained", "outlined", "text" ];

    click = e => {
        const buttonText = e.component.option("text");
        notify("The " + buttonText + " button was clicked");
    }

    constructor() { }
}

@NgModule({
    imports: [
        BrowserModule,
        DxButtonModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
