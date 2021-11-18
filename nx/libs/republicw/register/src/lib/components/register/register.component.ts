import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'nx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: any;

  constructor() { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.registerForm = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      date: new FormControl(''),
    })
  }

}
