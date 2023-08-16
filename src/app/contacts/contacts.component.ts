import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormComponent } from '../contacts/contact-form/contact-form.component'; 
import { Contact } from '../contacts/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [
    new Contact(
      'People 1',
      'Junior Programmer',
      'people1@example.com',
      '601234567890',
      'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
    ),
    new Contact(
      'People 2',
      'Senior Programmer',
      'people2@example.com',
      '601234567891',
      'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
    ),
    new Contact(
      'People 3',
      'Senior Programmer',
      'people3@example.com',
      '601234567892',
      'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
    ),
    new Contact(
      'People 4',
      'Intership',
      'people4@example.com',
      '601234567894',
      'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
    ),
    new Contact(
      'People 5',
      'Manager',
      'people5@example.com',
      '601234567895',
      'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
    ),
    new Contact(
      'People 6',
      'CEO',
      'people6@example.com',
      '601234567896',
      'The Shiba2 Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
    ),
  ];

  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('ContactsComponent initialized'); 
  }
  openContactForm() {
    this._dialog.open(ContactFormComponent);
  }
}
