import { NgModule, Component, Pipe, PipeTransform, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxTreeViewModule, DxListModule, DxTemplateModule } from 'devextreme-angular';

import { Product, Service } from './app.service';

@Pipe({ name: 'title' })
export class TitlePipe implements PipeTransform {
    transform(value: any): string {
        return value.text + (value.price ? ' ($' + value.price + ')' : '');
    }
}

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
    products: Product[];
    checkedItems: Product[] = [];

    constructor(service: Service) {
        this.products = service.getProducts();
    }

    selectionChanged(e) {
        let value = e.node;
        if (this.isProduct(value)) {
            this.processProduct({
                id: value.key,
                text: value.text,
                itemData: value.itemData,
                selected: value.selected,
                category: value.parent.text
            });
        } else {
            value.items.forEach((product, index) => {
                this.processProduct({
                    id: product.key,
                    text: product.text,
                    itemData: product.itemData,
                    selected: product.selected,
                    category: value.text
                });
            });
        }
    }

    isProduct(data) {
        return !data.items.length;
    }

    processProduct(product) {
        let itemIndex = -1;

        this.checkedItems.forEach((item, index) => {
            if (item.id === product.id) {
                itemIndex = index;
                return false;
            }
        });
        if (product.selected && itemIndex === -1) {
            this.checkedItems.push(product);
        } else if (!product.selected) {
            this.checkedItems.splice(itemIndex, 1);
        }
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxTreeViewModule,
        DxListModule,
        DxTemplateModule
    ],
    declarations: [AppComponent, TitlePipe],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);