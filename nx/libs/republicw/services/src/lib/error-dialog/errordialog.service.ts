import { Injectable, TemplateRef, ViewChild } from '@angular/core';
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorDialogComponent } from './errordialog.component';

@Injectable({
        'providedIn': 'root'
    }
)
export class ErrorDialogService {
    public isDialogOpen: Boolean = false;
    /**** Modal ****/
    @ViewChild('errModal') errModal : TemplateRef<any> | undefined;

    constructor( 
        public modalService: NgbModal 
    ) { }

    modalReference: any = null;

    openDialog(data:any): any {
        debugger;
        if (this.isDialogOpen) {
            return false;
        }
        this.isDialogOpen = true;
        this.modalReference = this.modalService.open(ErrorDialogComponent, {
            size: 'sm', backdrop: 'static',
        });
        //this.modalReference.componentInstance.data = data;
    }
}