import { Component, OnInit } from '@angular/core';
import { Vessel } from '../vessels/vessel.model';
import { MatDialog } from '@angular/material/dialog';
import { VesselFormComponent } from '../vessels/vessel-form/vessel-form.component';
import { ActivatedRoute, Params } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { Company } from '../companys/company.model';

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css'],
})
export class VesselsComponent implements OnInit {
  company: Company;
  id: number;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    console.log('VesselComponent initialized');
    this.route.parent?.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.company = this.companyService.getCompany(this.id);
    });
  }

  openVesselForm() {
    this.dialog.open(VesselFormComponent);
  }
  applyFilter(filterValue: string): void {
    if (filterValue === '') {
      this.company.vessels = this.company.vessels.slice();
    } else {
      this.company.vessels = this.company.vessels.filter((vessel) => {
        const valuesToSearch = Object.values(vessel).join(' ').toLowerCase();
        return valuesToSearch.includes(filterValue.toLowerCase());
      });
    }
  }
}
