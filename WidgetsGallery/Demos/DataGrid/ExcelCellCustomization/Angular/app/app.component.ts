import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule } from 'devextreme-angular';
import { Service, Order } from './app.service';

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
    orders: Order[];

    constructor(private service: Service) {
        this.orders = service.getOrders();
    }

    onCellPrepared(e) {
        if(e.rowType === 'data') {
            if(e.data.OrderDate < new Date(2014, 2, 3)) {
                e.cellElement.classList.add('oldOrder');
            }
            if(e.data.SaleAmount > 15000) {
                if(e.column.dataField === 'Employee') {
                    e.cellElement.classList.add('highAmountOrder_employee');
                }
                if(e.column.dataField === 'SaleAmount') {
                    e.cellElement.classList.add('highAmountOrder_saleAmount');
                }
            }
        }
    }
    
    customizeExcelCell(options) {
        if(options.gridCell.rowType === 'data') {
            if(options.gridCell.data.OrderDate < new Date(2014, 2, 3)) {
                options.font.color = '#AAAAAA';
            }
            if(options.gridCell.data.SaleAmount > 15000) {
                if(options.gridCell.column.dataField === 'Employee') {
                    options.font.bold = true;
                }
                if(options.gridCell.column.dataField === 'SaleAmount') {
                    options.backgroundColor = '#FFBB00';
                    options.font.color = '#000000';
                }
            }
        }
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxDataGridModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);