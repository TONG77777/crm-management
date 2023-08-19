import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Company } from '../company.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Company2Service } from 'src/app/services/company2.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css'],
})
export class CompanyFormComponent implements OnInit {
  companyForm: FormGroup;
  isEditMode: boolean = false;
  initialFormState: any;
  constructor(
    private fb: FormBuilder,
    private compService: Company2Service,
    private dialogRef: MatDialogRef<CompanyFormComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.companyForm = this.fb.group({
      name: '',
      priority: '',
      date: '',
      notes: '',
    });
    this.initialFormState = this.companyForm.value;
  }
  @HostListener('document:keydown.enter', ['$event'])
  preventSubmit(event: KeyboardEvent): void {
    event.preventDefault();
  }
  ngOnInit(): void {
    if (this.data) {
      this.companyForm.patchValue(this.data);
    }
  }

  onReset() {
    if (!this.isEditMode) {
      this.companyForm.setValue(this.initialFormState);
    } else {
      this.dialogRef.close();
    }
  }

  onCompanyFormSubmit() {
    if (this.companyForm.valid) {
  
      const originalDate = new Date(this.companyForm.value.date);
      const formattedDate = originalDate.toISOString();
      
      if (this.data) {
        const editedCompany: Company = {
          id: this.data.companyId,
          name: this.companyForm.value.name,
          priority: this.companyForm.value.priority,
          date: formattedDate,
          notes: this.companyForm.value.notes,
        };

        this.compService
          .updateCompany(this.data.id, editedCompany)
          .subscribe({
            next: (val: any) => {
              alert('Company Edit Successfully');
             this.compService.getCompanyList().subscribe({
              next: (res) => {
                this.dialogRef.close(true);
              },
              error: console.log,
            });
            },
            error: console.log,
          });
      } else {
        const newCompany: Company = {
          id: 0,
          name: this.companyForm.value.name,
          priority: this.companyForm.value.priority,
          date: formattedDate,
          notes: this.companyForm.value.notes,
        };
        this.compService.addCompany(newCompany).subscribe({
          next: (val: any) => {
            alert('Company Added successfully');
            this.compService.getCompanyList().subscribe({
              next: (res) => {
                this.dialogRef.close(true);
              },
              error: console.log,
            });
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    }
  }
}
