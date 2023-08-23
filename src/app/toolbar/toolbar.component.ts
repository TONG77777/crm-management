import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company2Service } from '../services/company2.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    private router: Router,
    private compService: Company2Service,
  ) {}
  showButton: boolean = true;

  getCompanyList() {
    this.compService.getCompanyList().subscribe({
      next: (res) => {},
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
