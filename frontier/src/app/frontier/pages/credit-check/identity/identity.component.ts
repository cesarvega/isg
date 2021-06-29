import { Component, OnInit, Output, EventEmitter, Input, SimpleChange } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.css']
})
export class IdentityComponent implements OnInit {
  @Input() identityFormValues: any;
  @Input() loading: Boolean;
  verifyIdentityForm;
  selectedTestCase: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let { dateOfBirth, ssn } = this.identityFormValues ?? {};
    this.verifyIdentityForm = this.formBuilder.group({
      dateOfBirth: [dateOfBirth, [Validators.required]],
      ssn: [ssn, [Validators.required]],
    });
  }
  @Output() submitIdentityForm = new EventEmitter<any>();
  submitted: Boolean = false;



  onSubmit() {
    this.submitted = true
    if (this.verifyIdentityForm.valid) {
      this.submitIdentityForm.emit(this.verifyIdentityForm.value);
    }
  }

  private patchValue(testCase) {
    if (this.verifyIdentityForm)
      this.verifyIdentityForm.patchValue({ ...testCase });
  }



  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    if (changes['identityFormValues'] && this.verifyIdentityForm) {
      this.patchValue(this.identityFormValues)
    }

  }
}
