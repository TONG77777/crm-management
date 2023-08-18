import { Component, OnInit, Inject, HostListener } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isEditMode: boolean = false;
  CompanyContacts = new FormArray([]);
  companyId: number;
  initialFormState: any;
  constructor(
    private fb: FormBuilder,
    private compService: CompanyService,
    private dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contactForm = this.fb.group({
      contactName: '',
      title: '',
      email: '',
      phone: '',
      notes: '',
      contacts: this.CompanyContacts,
    });
    this.initialFormState = this.contactForm.value;
    this.CompanyContacts = this.fb.array([]);
  }
  @HostListener('document:keydown.enter', ['$event'])
  preventSubmit(event: KeyboardEvent): void {
    event.preventDefault();
  }
  get contactControls() {
    return (this.contactForm.get('contacts') as FormArray).controls;
  }

  ngOnInit(): void {
    if (this.data.isEditMode) {
      this.isEditMode = true;
      const companyId = this.data.companyId;
      const contactIndex = this.data.contactIndex;
      const company = this.compService.getCompanyById(companyId);
      const contact = company.contacts[contactIndex];
      this.contactForm.patchValue(contact);
      this.emailFormControl.setValue(contact.email);
    }
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  onReset() {
    if (!this.isEditMode) {
      this.contactForm.setValue(this.initialFormState);
    }
    else{
      this.dialogRef.close();
    }
  }

  generateNewContactId(): number {
    const existingContacts = this.contactControls.map(
      (control) => control.value
    );
    const maxId = Math.max(
      ...existingContacts.map((contact) => contact.contactId)
    );
    return maxId + 1;
  }

  onContactFormSubmit() {
    if (this.contactForm.valid && this.emailFormControl.valid) {
      const companyId = this.data.companyId;
      const contactIndex = this.data.contactIndex;
      const company = this.compService.getCompanyById(companyId);
  
      if (this.isEditMode) {
        const editedContact = company.contacts[contactIndex];
        Object.assign(editedContact, this.contactForm.value, { email: this.emailFormControl.value });
        console.log('Edit contact successfully');
      } else {
        const newContactFormGroup = this.fb.group({
          contactName: this.contactForm.value.contactName,
          title: this.contactForm.value.title,
          email: this.emailFormControl.value,
          phone: this.contactForm.value.phone,
          notes: this.contactForm.value.notes,
        });
        
        (this.contactForm.get('contacts') as FormArray).push(newContactFormGroup);
  
        const newContact = {
          contactId: this.generateNewContactId(),
          ...newContactFormGroup.value,
        };
  
        company.contacts.push(newContact);
        console.log('Add contact successfully');
      }
  
      this.dialogRef.close();
      this.contactForm.reset();
    }
  }
  
}
