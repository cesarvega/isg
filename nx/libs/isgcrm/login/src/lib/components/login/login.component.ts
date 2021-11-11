import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';

@Component({
  selector: 'nx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formData!: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.formData = new FormGroup({
      user_name: new FormControl( '', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  async onSubmit(){
    if( this.formData.invalid ) return;
    
    const user = this.formData.value;
    
    //dispath event login
    //await this.loginService.doLogin(user);
    this.router.navigate(['./products']);
    console.log('form submitted ');
  }
}
