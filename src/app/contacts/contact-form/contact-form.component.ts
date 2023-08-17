import { Component, OnInit, Inject } from '@angular/core';
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

  get contactControls() {
    return (this.contactForm.get('contacts') as FormArray).controls;
  }

  ngOnInit(): void {
    if(this.data.isEditMode){
      this.isEditMode = true; 
      const companyId = this.data.companyId;
      const contactIndex = this.data.contactIndex;
      const company = this.compService.getCompanyById(companyId);
      const contact = company.contacts[contactIndex];
      this.contactForm.patchValue(contact);
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
    if (this.isEditMode) {
      const companyId = this.data.companyId;
      const contactIndex = this.data.contactIndex;
      const company = this.compService.getCompanyById(companyId);
      company.contacts[contactIndex] = this.contactForm.value;
    } else {
      const newContactFormGroup = this.fb.group({
        contactName: this.contactForm.value.contactName,
        title: this.contactForm.value.title,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        notes: this.contactForm.value.notes,
      });
      console.log(this.contactForm.value);
      console.log('Add contact successfully');

      (this.contactForm.get('contacts') as FormArray).push(newContactFormGroup);

      const newContact = {
        contactId: this.generateNewContactId(),
        contactName: newContactFormGroup.value.contactName,
        title: newContactFormGroup.value.title,
        email: newContactFormGroup.value.email,
        phone: newContactFormGroup.value.phone,
        notes: newContactFormGroup.value.notes,
      };

      const companyId = this.data.companyId;
      const company = this.compService.getCompanyById(companyId);
      company.contacts.push(newContact);
    }
    this.dialogRef.close();
    this.contactForm.reset();
  }
}
