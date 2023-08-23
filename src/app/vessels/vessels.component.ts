import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VesselFormComponent } from '../vessels/vessel-form/vessel-form.component';
import { ActivatedRoute, Params } from '@angular/router';
import { VesselService } from '../services/vessel.service';
import { Vessel } from './vessel.model';
VesselService;

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css'],
})
export class VesselsComponent implements OnInit {
  vessels: Vessel[];
  companyId: number;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private vesServive: VesselService,
  ) {}

  ngOnInit(): void {
    console.log('VesselComponent initialized');
    this.route.parent?.params.subscribe((params: Params) => {
      this.companyId = +params['id'];
      this.getVesselsByCompanyId(this.companyId);
    });
  }

  openEditForm(id: number, data: any, isEditMode: boolean) {
    console.log(data);
    const dialogRef = this.dialog.open(VesselFormComponent, {
      data: { ...data, isEditMode: true },
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVesselsByCompanyId(data.companyId);
        }
      },
      error: console.log,
    });
  }

  openVesselForm(companyId: number, isEditMode: boolean) {
    const dialogRef = this.dialog.open(VesselFormComponent, {
      data: { companyId: companyId, isEditMode: false },
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVesselsByCompanyId(companyId);
        }
      },
      error: console.log,
    });
  }

  applyFilter(filterValue: string): void {
    if (!this.vessels) {
      return;
    }
    if (filterValue === '') {
      this.getVesselsByCompanyId(this.companyId);
    } else {
      this.vessels = this.vessels.filter((vessel) => {
        const valuesToSearch = Object.values(vessel).join(' ').toLowerCase();
        return valuesToSearch.includes(filterValue.toLowerCase());
      });
    }
  }

  onDeleteVessel(id: number, companyId: number) {
    console.log('hi you are in ondeletecontact');
    this.vesServive.deleteVesselsByCompanyId(id).subscribe({
      next: (res) => {
        alert('Delete Vessel Successfully');
        this.getVesselsByCompanyId(companyId);
      },
      error: console.log,
    });
  }

  getVesselsByCompanyId(companyId: number) {
    this.vesServive.getVesselsByCompanyId(this.companyId).subscribe({
      next: (vessels) => {
        this.vessels = vessels;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
