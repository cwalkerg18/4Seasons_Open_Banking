import {
    Injectable
} from '@angular/core';

export class Area {
    name: string;
    area: number;
}

let countries: Area[] = [{
    name: "Russia",
    area: 0.12
}, {
        name: "Canada",
        area: 0.07
    }, {
        name: "USA",
        area: 0.07
    }, {
        name: "China",
        area: 0.07
    }, {
        name: "Brazil",
        area: 0.06
    }, {
        name: "Australia",
        area: 0.05
    }, {
        name: "India",
        area: 0.02
    }, {
        name: "Others",
        area: 0.55
    }];

let waterLandRatio: Area[] = [{
        name: 'Land',
        area: 0.29
}, {
        name: 'Water',
        area: 0.71
    }];

@Injectable()
export class Service {
    getAreas(): Area[] {
        return countries;
    }
    
    getLandWaterAreas(): Area[] {
        return waterLandRatio;
    }
}