import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { DxChartModule } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';

if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})
export class AppComponent {
    dataSource: any;
    connectionStarted: boolean;

    constructor() {
        this.connectionStarted = false;

        var hubConnection = new HubConnectionBuilder()
            .withUrl("https://js.devexpress.com/Demos/NetCore/stockTickDataHub")
            .build();

        var store = new CustomStore({
            load: () => hubConnection.invoke("getAllData"),
            key: "date"
        });

        hubConnection
            .start()
            .then(() => {
                hubConnection.on("updateStockPrice", (data: any) => {
                    store.push([{ type: "insert", key: data.date, data: data }]);
                });
                this.dataSource = store;
                this.connectionStarted = true;
            });
    }

    calculateCandle(e) { 
        const prices = e.data.map(d => d.price);
        if (prices.length) {
            return {
                date: e.intervalStart,
                open: prices[0],
                high: Math.max.apply(null, prices),
                low: Math.min.apply(null, prices),
                close: prices[prices.length - 1]
            };
        }
    }

    zoomEnd(e) {
        if (e.range.endValue - e.range.startValue < 1000 * 60 * 10) {
            e.cancel = true;
        }
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxChartModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
