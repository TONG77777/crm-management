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
  isEditMode: boolean = false;

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
  ngOnInit(): void {
    if (this.data.companyId) {
      this.isEditMode = true;
      const company = this.companyService.getCompanyById(this.data.companyId);
      if (company) {
        this.populateFormFields(company);
      }
    }
  }

  private populateFormFields(company: Company): void {
    this.companyForm.setValue({
      companyName: company.name,
      priority: company.priority,
      date_add: new Date(company.date), 
      notes: company.notes,
    });
  }

  onReset() {
    this.companyForm.reset();
  }

  onCompanyFormSubmit() {
    if (this.companyForm.valid) {
      const formattedDate = formatDate(
        this.companyForm.value.date_add,
        'yyyy-MM-ddTHH:mm:ss.SSSZ',
        'en-US'
      );
  
      if (this.isEditMode) {
        const editedCompany: Company = {
          id: this.data.companyId,
          name: this.companyForm.value.companyName,
          priority: this.companyForm.value.priority,
          date: formattedDate,
          notes: this.companyForm.value.notes,
        };
  
        this.companyService.editCompany(editedCompany);
      } else {
        //get existing companyId
        const existingIds = this.companyService.getCompanys().map(company => company.id);
        const newId = Math.max(...existingIds) + 1;

        const newCompany: Company = {
          id: newId,
          name: this.companyForm.value.companyName,
          priority: this.companyForm.value.priority,
          date: formattedDate,
          notes: this.companyForm.value.notes,
          
        };
  
        this.companyService.addCompany(newCompany);
      }
  
      this.dialogRef.close();
      this.companyForm.reset();
    }
  }
  
}
