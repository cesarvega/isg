import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { SYSTEM_CONFIG } from '@nx/earthlink/config';
import { ENDPOINT } from '@nx/earthlink/api';


@Component({
  selector: 'nx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: any;
  password: any;
  formdata: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  createFormControls(){
    this.email = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
  }

  createForm(){
    this.formdata = new FormGroup({
      email: this.email,
      password: this.password
    })
  }

  onSubmit(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };

    const request = this.formdata.value;
 
    this.http.post( SYSTEM_CONFIG.API_URL + ENDPOINT.login.path, request, options).subscribe(
      () => this.router.navigate([ENDPOINT.address.navigate]),
      (error) => console.log( error)
    )
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm()
  }

}