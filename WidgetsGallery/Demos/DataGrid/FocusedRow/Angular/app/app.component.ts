import { NgModule, Component, ViewChild, enableProdMode } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridComponent,
         DxNumberBoxComponent,
         DxDataGridModule,
         DxNumberBoxModule } from 'devextreme-angular';

import 'devextreme/data/odata/store';

if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    preserveWhitespaces: true
})
export class AppComponent {
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    @ViewChild(DxNumberBoxComponent) numberBox: DxNumberBoxComponent;
    columns: any;
    dataSource: any;
    isReady: boolean;
    taskSubject: string;
    taskDetailsHtml: SafeHtml;
    taskStatus: string;
    taskProgress: string;
    focusedRowKey: number;

    constructor(private sanitizer: DomSanitizer) {
        this.dataSource = {
            store: {
                type: "odata",
                key: "Task_ID",
                url: "https://js.devexpress.com/Demos/DevAV/odata/Tasks"
            },
            expand: "ResponsibleEmployee",
            select: [
                'Task_ID',
                'Task_Subject',
                'Task_Start_Date',
                'Task_Status',
                'Task_Description',
                'Task_Completion',
                'ResponsibleEmployee/Employee_Full_Name'
              ]
        };
        this.columns = [
            {
                dataField: "Task_ID",
                width: 80
            }, {
                caption: "Start Date",
                dataField: "Task_Start_Date",
                dataType: "date"
            }, {
                caption: "Assigned To",
                dataField: "ResponsibleEmployee.Employee_Full_Name",
                cssClass: "employee",
                allowSorting: false
            }, {
                caption: "Subject",
                dataField: "Task_Subject",
                width: 350
            },  {
                caption: "Status",
                dataField: "Task_Status"
            }
        ];
    }

    onFocusedRowChanging(e) {
        var rowsCount = e.component.getVisibleRows().length,
            pageCount = e.component.pageCount(),
            pageIndex = e.component.pageIndex();

        if(e.event.key && e.prevRowIndex === e.newRowIndex) {
            if(e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
                e.component.pageIndex(pageIndex + 1).done(function() {
                    e.component.option("focusedRowIndex", 0);
                });
            } else if(e.newRowIndex === 0 && pageIndex > 0) {
                e.component.pageIndex(pageIndex - 1).done(function() {
                    e.component.option("focusedRowIndex", rowsCount - 1);
                });
            }
        }
    }

    onFocusedRowChanged(e) {
        var data = e.row.data;
        this.taskSubject = data.Task_Subject;
        this.taskDetailsHtml = this.sanitizer.bypassSecurityTrustHtml(data.Task_Description);
        this.taskStatus = data.Task_Status;
        this.taskProgress = data.Task_Completion ? `${data.Task_Completion}` + "%" : "";

        this.focusedRowKey = e.component.option("focusedRowKey");
        this.numberBox.instance.option("value", e.component.option("focusedRowKey"));
    }

    onTaskIdChanged(e) {
        if(e.event && e.value > 0) {
            this.dataGrid.instance.option("focusedRowKey", e.value);
        }
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxDataGridModule,
        DxNumberBoxModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);