import { Injectable } from "@angular/core";
import { SYSTEM_CONFIG } from "@nx/isgcrm/config";
import { ApiService } from "@nx/isgcrm/common";

@Injectable({
    providedIn: 'root'
})
export class FeaturesService {

    constructor(
        private apiService: ApiService
    ) { }

    getPrimarys( endpoint: string ){
        return this.apiService.get( SYSTEM_CONFIG.API_URL + endpoint );
    }

    getFeatures(){
        //var features_url = SYSTEM_CONFIG.FEATURES;
        //features_url.replace( /@@id@@/, id );
        return this.apiService.get( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.FEATURES );
    }

    getClassType(){
        return this.apiService.get( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.CLASS_TYPES );
    }
}