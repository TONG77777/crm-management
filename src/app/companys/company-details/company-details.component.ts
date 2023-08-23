import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css'],
})
export class CompanyDetailsComponent implements OnInit {
  selectedTabIndex: number = 0; // default to contact

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id'] && params['details']) {
        if (params['details'] === 'contacts') {
          this.selectedTabIndex = 0;
        } else if (params['details'] === 'vessels') {
          this.selectedTabIndex = 1;
        }
      }
    });
  }

  onTabChange(event: any): void {
    if (event.index === 0) {
      this.router.navigate(['contacts'], { relativeTo: this.route });
    } else if (event.index === 1) {
      this.router.navigate(['vessels'], { relativeTo: this.route });
    }
  }
}
