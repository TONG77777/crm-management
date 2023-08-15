import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'; // Import Validators

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

 
  constructor() { }

  ngOnInit(): void {
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

}
