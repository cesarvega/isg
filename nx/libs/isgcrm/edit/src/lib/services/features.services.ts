import { Injectable, SystemJsNgModuleLoader } from "@angular/core";
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
        return this.apiService.get( SYSTEM_CONFIG.API_URL + endpoint, undefined );
    }

    getFeatures( id: number ){
        return this.apiService.get( SYSTEM_CONFIG.API_URL + SYSTEM_CONFIG.FEATURES + id + '/features' );
    }
}