import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
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
  ) {}

  ngOnInit(): void {
    this.createForm();
    localStorage.clear();
  }

  createForm(){
    this.formData = new FormGroup({
      user: new FormControl( '', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  async onSubmit(){
    if( this.formData.invalid ) return;
    
    const user = this.formData.value;
    
    //dispath event login
    await this.loginService.doLogin(user);
  }
}
