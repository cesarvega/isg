import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '@nx/republicw/services';

@Component({
  selector: 'nx-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  formData!: any;
  email: any = null;
  password: any = null;

  constructor(
    private apiService: ApiService,
  ) { 
    this.createForm();
  }

  async ngOnInit() {
    const response = await this.apiService.post( '/token', this.formData.value, undefined );
    console.log(response);
  }

  createForm(){
    this.formData = new FormGroup({
      email: new FormControl('admin@isg.us'),
      password: new FormControl('admin@isg')
    });
  }
}
