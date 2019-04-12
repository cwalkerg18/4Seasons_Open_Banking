import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxListModule, DxToolbarModule, DxSelectBoxModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';

import { ProductType, Product, Service } from './app.service';

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
    items: any[];
    productTypes: ProductType[];
    productsStore: any;

    constructor(service: Service) { 
        let products = service.getProducts();
        this.productTypes = service.getProductTypes();

        this.productsStore = new DataSource(products);
        this.items = [{
            location: 'before',
            widget: 'dxButton',
            options: {
                type: 'back',
                text: 'Back',
                onClick: () => {
                    notify('Back button has been clicked!');
                }
            }
        }, {
            location: 'before',
            widget: 'dxButton',
            locateInMenu: 'auto',
            options: {
                icon: 'refresh',
                onClick: () => {
                    notify('Refresh button has been clicked!');
                }
            }
        }, {
            location: 'center',
            locateInMenu: 'never',
            template: () => {
                return '<div class=\'toolbar-label\'><b>Tom\'s Club</b> Products</div>';
            }
        }, {
            location: 'after',
            widget: 'dxSelectBox',
            locateInMenu: 'auto',
            options: {
                width: 140,
                items: this.productTypes,
                valueExpr: 'id',
                displayExpr: 'text',
                value: this.productTypes[0].id,
                onValueChanged: (args) => {
                    if (args.value > 1) {
                        this.productsStore.filter('type', '=', args.value);
                    } else {
                        this.productsStore.filter(null);
                    }
                    this.productsStore.load();
                }
            }
        }, {
            location: 'after',
            widget: 'dxButton',
            locateInMenu: 'auto',
            options: {
                icon: 'plus',
                onClick: () => {
                    notify('Add button has been clicked!');
                }
            }
        }, {
            locateInMenu: 'always',
            text: 'Save',
            onClick: () => {
                notify('Save option has been clicked!');
            }
        }, {
            locateInMenu: 'always',
            text: 'Print',
            onClick: () => {
                notify('Print option has been clicked!');
            }
        }, {
            locateInMenu: 'always',
            text: 'Settings',
            onClick: () => {
                notify('Settings option has been clicked!');
            }
        }];
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxListModule,
        DxToolbarModule,
        DxSelectBoxModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);