import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormComponent } from '../contacts/contact-form/contact-form.component';
import { Company } from '../companys/company.model';
import { CompanyService } from '../services/company.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  company: Company;
  id: number;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    console.log('ContactsComponent initialized');

    this.route.parent?.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.company = this.companyService.getCompany(this.id);
    });
  }
  // openContactForm() {
  //   this.dialog.open(ContactFormComponent);
  // }
  // openContactForm(companyId: number) {
  //   const dialogRef = this.dialog.open(ContactFormComponent, {
  //     data: { companyId: companyId }
  //   });
  
  //   dialogRef.afterClosed().subscribe((newContact) => {
  //     if (newContact) {
  //       // Assuming 'newContact' is the created contact object
  //       this.company.contacts.push(newContact);
  //       this.companyService.updateCompany(this.company);
  //     }
  //   });
  // }
  openContactForm(companyId: number) {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      data: { companyId: companyId }
    });
  }
  

  onDeleteContact(contactIndex: number) {
    if (this.company && this.company.contacts) {
      if (contactIndex >= 0 && contactIndex < this.company.contacts.length) {
        this.company.contacts.splice(contactIndex, 1);
        this.companyService.updateCompany(this.company);
      }
    }
  }
  
}
