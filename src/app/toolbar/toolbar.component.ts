import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyFormComponent } from '../companys/company-form/company-form.component'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router) {}
  showButton: boolean = true;
  
  openCompForm() {
    this.dialog.open(CompanyFormComponent);
  }

  ngOnInit(): void {
    console.log('toolbar load!');
  }
  navigateToCompanyList(): void {
    this.router.navigate(['/companys']);
  }
}
