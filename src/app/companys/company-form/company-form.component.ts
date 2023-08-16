// company-form.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { formatDate } from '@angular/common';
import { Company } from '../company.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css'],
})
export class CompanyFormComponent implements OnInit {
  companyForm: FormGroup;

  ngOnInit(): void {
    if (this.data.companyId) {
      const company = this.companyService.getCompanyById(this.data.companyId);
      if (company) {
        this.populateFormFields(company);
      }
    }
  }
  
  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private dialogRef: MatDialogRef<CompanyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { companyId: number }
  ) {
    this.companyForm = this.fb.group({
      companyName: '',
      priority: '',
      date_add: '',
      notes: '',
    });
  }

  private populateFormFields(company: Company): void {
    this.companyForm.setValue({
      companyName: company.name,
      priority: company.priority,
      date_add: company.date,
      notes: company.notes,
    });
  }

  onReset() {
    this.companyForm.reset();
  }

  // onCompanyFormSubmit() {
  //   if (this.companyForm.valid) {
  //     //   console.log(this.companyForm.value);
  //     const formattedDate = formatDate(
  //       this.companyForm.value.date_add,
  //       'yyyy-MM-ddTHH:mm:ss.SSSZ',
  //       'en-US'
  //     );
  //     const newCompany: Company = {
  //       id: 12,
  //       name: this.companyForm.value.companyName,
  //       priority: this.companyForm.value.priority,
  //       date: formattedDate,
  //       notes: this.companyForm.value.notes,
  //     };

  //     this.companyService.addCompany(newCompany);
  //     this.dialogRef.close();
  //     this.companyForm.reset();
  //   }
  // }

  onCompanyFormSubmit() {
    if (this.companyForm.valid) {
      const formattedDate = formatDate(
        this.companyForm.value.date_add,
        'yyyy-MM-ddTHH:mm:ss.SSSZ',
        'en-US'
      );

      const editedCompany: Company = {
        id: this.data.companyId,
        name: this.companyForm.value.companyName,
        priority: this.companyForm.value.priority,
        date: formattedDate,
        notes: this.companyForm.value.notes,
      };

      this.companyService.editCompany(editedCompany);
      this.dialogRef.close();
    }
  }
}
