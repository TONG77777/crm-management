import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Contact } from '../contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isEditMode = false;

  initialFormState: any;
  constructor(
    private fb: FormBuilder,
    private contService: ContactService,
    private dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.contactForm = this.fb.group({
      companyId: '',
      contactName: ['', Validators.required],
      title: '',
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      notes: '',
    });
    this.initialFormState = this.contactForm.value;
  }
  @HostListener('document:keydown.enter', ['$event'])
  preventSubmit(event: KeyboardEvent): void {
    event.preventDefault();
  }

  ngOnInit(): void {
    if (this.data.isEditMode) {
      this.isEditMode = true;
      this.contactForm.patchValue(this.data);
    }
  }

  onReset(): void {
    const isEditMode = this.data.isEditMode;
    if (!isEditMode) {
      this.contactForm.setValue(this.initialFormState);
    } else {
      this.dialogRef.close();
    }
  }

  onContactFormSubmit(): void {
    if (this.contactForm.valid) {
      const companyId = this.data.companyId;
      const isEditMode = this.data.isEditMode;

      if (isEditMode) {
        const editContact: Contact = {
          id: this.data.id,
          companyId,
          contactName: this.contactForm.value.contactName,
          title: this.contactForm.value.title,
          email: this.contactForm.value.email,
          phone: this.contactForm.value.phone,
          notes: this.contactForm.value.notes,
        };

        this.contService.updateContact(this.data.id, editContact).subscribe({
          next: (val: any) => {
            alert('Contact Edit Successfully');
            this.contService.getContactsByCompanyId(companyId).subscribe({
              next: (res) => {
                this.dialogRef.close(true);
              },
              error: console.log,
            });
          },
          error: console.log,
        });
      } else {
        const newContact: Contact = {
          id: 0,
          companyId,
          contactName: this.contactForm.value.contactName,
          title: this.contactForm.value.title,
          email: this.contactForm.value.email,
          phone: this.contactForm.value.phone,
          notes: this.contactForm.value.notes,
        };

        this.contService
          .addContactByCompanyId(companyId, newContact)
          .subscribe({
            next: (val: any) => {
              alert('Contact Added successfully');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      }
      this.contactForm.reset();
    }
  }
  onCloseDialog(): void {
    this.dialogRef.close();
  }
}
