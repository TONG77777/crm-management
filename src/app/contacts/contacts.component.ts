import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormComponent } from '../contacts/contact-form/contact-form.component';
import { ActivatedRoute, Params } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from './contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  companyId: number;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private contService: ContactService
  ) {}

  ngOnInit(): void {
    console.log('ContactsComponent initialized');
    this.route.parent?.params.subscribe((params: Params) => {
      this.companyId = +params['id'];
      this.getContactById(this.companyId);
    });
  }

  openEditForm(id: number, data: any, isEditMode: true) {
    console.log(data);
    const dialogRef = this.dialog.open(ContactFormComponent, {
      data: { ...data, isEditMode: true },
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getContactById(data.companyId);
        }
      },
      error: console.log,
    });
  }

  openAddContactForm(companyId: number, isEditMode: boolean) {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      data: { companyId: companyId, isEditMode: false },
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getContactById(companyId);
        }
      },
      error: console.log,
    });
  }

  onDeleteContact(id: number, companyId: number) {
    console.log('hi you are in ondeletecontact');
    this.contService.deleteContactByCompanyId(id).subscribe({
      next: (res) => {
        alert('Delete Contact Successfully');
        this.getContactById(companyId);
      },
      error: console.log,
    });
  }

  getContactById(companyId: number): void {
    this.contService.getContactsByCompanyId(companyId).subscribe({
      next: (contacts) => {
        console.log(contacts);
        this.contacts = contacts;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
