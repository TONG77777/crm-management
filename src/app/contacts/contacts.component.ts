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
  openContactForm() {
    this.dialog.open(ContactFormComponent);
  }
}
