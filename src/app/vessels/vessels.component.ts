import { Component, OnInit } from '@angular/core';
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

  openEditForm(vesselIndex: number, companyId: number) {
    const dialogRef = this.dialog.open(VesselFormComponent, {
      data: { vesselIndex: vesselIndex, companyId: companyId, isEditMode:true },
    });
  }

  openVesselForm(companyId: number) {
    const dialogRef = this.dialog.open(VesselFormComponent, {
      data: { companyId: companyId },
    });
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

  onDeleteVessel(vesselIndex: number) {
    if (this.company && this.company.vessels) {
      if (vesselIndex >= 0 && vesselIndex < this.company.vessels.length) {
        this.company.vessels.splice(vesselIndex, 1);
        this.companyService.updateCompany(this.company);
      }
    }
  }
}
