// company-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css'],
})
export class CompanyFormComponent implements OnInit {
  companyForm: FormGroup;

  ngOnInit(): void {}
  constructor(private fb: FormBuilder, private companyService: CompanyService) {
    this.companyForm = this.fb.group({
      companyName: '',
      priority: '',
      date_add: '',
      notes: '',
    });
  }

  onCompanyFormSubmit() {
    if (this.companyForm.valid) {
      // console.log(this.companyForm.value)
      this.companyService.addCompany(this.companyForm.value);
    }
  }
}
