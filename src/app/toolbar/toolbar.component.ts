import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyFormComponent } from '../companys/company-form/company-form.component'; 
import { Router } from '@angular/router';
import { Company2Service } from '../services/company2.service';
import { Company } from '../companys/company.model';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    private dialog: MatDialog, 
    private router: Router,
    private compService: Company2Service
    ) {}
  showButton: boolean = true;
  


  getCompanyList() {
    this.compService.getCompanyList().subscribe({
      next: (res) => {
      },
      error: console.log,
    });
  }

  ngOnInit(): void {
    console.log('toolbar load!');
  }
  navigateToCompanyList(): void {
    this.router.navigate(['/companys']);
  }
}
