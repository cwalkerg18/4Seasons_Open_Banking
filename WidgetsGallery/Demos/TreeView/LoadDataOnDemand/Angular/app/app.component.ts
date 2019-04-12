import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxTreeViewModule } from 'devextreme-angular';

import { Service } from './app.service';

if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    providers: [Service]
})
export class AppComponent {
    folderStructure: any;

    constructor(service: Service) {
        this.folderStructure = service.getFolderStructure();
    }
    
    createChildren = (parent) => {
        let parentId = parent ? parent.itemData.id : "",
            fileNames = this.folderStructure[parentId];

        if (!fileNames) return [];

        return fileNames.map((fileName) => {
            let fullName = parentId ? parentId + "\\" + fileName : fileName;
            return {
                id: fullName,
                parentId: parentId,
                text: fileName,
                hasItems: !!this.folderStructure[fullName]
            };
        });
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxTreeViewModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);