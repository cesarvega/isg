import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setUserAction } from '../store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginFormBuilder: FormBuilder, private store: Store<any>, private router: Router) { }

  submitted: boolean = false;
  loading: boolean = false;

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      let user = this.loginForm.value;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.store.dispatch(setUserAction(user));
        this.router.navigate([""]);
      }, 1000);
    }
  }


  loginForm = this.loginFormBuilder.group({
    agentId: ['', Validators.required],
    password: ['', Validators.required]
  });


}
