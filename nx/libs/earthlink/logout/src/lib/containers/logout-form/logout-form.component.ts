import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { SYSTEM_CONFIG } from '@nx/earthlink/config';
import { ENDPOINT } from '@nx/earthlink/api';

@Component({
  selector: 'nx-logout-form',
  templateUrl: './logout-form.component.html',
  styleUrls: ['./logout-form.component.scss']
})
export class LogoutFormComponent implements OnInit {
  tokenValue: any;
  token: any;
  formdata: any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.tokenValue = localStorage.getItem('token');
  }
  


  onSubmit(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenValue,
      'Accept': 'application/json'
    });

    let options = { headers: headers };
    const request = this.formdata.value;
    this.http.post( SYSTEM_CONFIG.API_URL + ENDPOINT.logout.path, request, options).subscribe(
      (response) => this.router.navigate([ENDPOINT.login.navigate]),
      (error) => console.log(error)
    )
  }

  createFormControls(){
    this.token = new FormControl( this.tokenValue, Validators.required );
  }

  createForm(){
    this.formdata = new FormGroup({
      token: this.token,
    })
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.onSubmit();
  }

}
