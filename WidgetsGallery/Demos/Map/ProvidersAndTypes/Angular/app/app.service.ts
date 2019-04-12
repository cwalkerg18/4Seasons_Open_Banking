import { Injectable } from '@angular/core';

export class MapSetting {
    key: string;
    name: string;
}

let mapTypes: MapSetting[] = [{
    key: "roadmap",
    name: "Default Map"
}, {
    key: "satellite",
    name: "Photographic Map"
}, {
    key: "hybrid",
    name: "Hybrid Map"
}];

let mapProviders: MapSetting[] = [{
    key: "bing",
    name: "Bing Map"
}, {
    key: "google",
    name: "Google Dynamic Map"
}, {
    key: "googleStatic",
    name: "Google Static Map"
}];


@Injectable()
export class Service {
    getMapTypes(): MapSetting[] {
        return mapTypes;
    }
    getMapProviders(): MapSetting[] {
        return mapProviders;
    }
}