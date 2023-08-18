import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Company } from './company.model';
import { CompanyService } from '../services/company.service';
import { CompanyFormComponent } from './company-form/company-form.component';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-companys',
  templateUrl: './companys.component.html',
  styleUrls: ['./companys.component.css'],
})
export class CompanysComponent implements OnInit {
  companys: Company[];

  displayedColumns: string[] = [
    'id',
    'name',
    'priority',
    'date-add',
    'notes',
    'menu',
  ];
  dataSource: MatTableDataSource<Company>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private compService: CompanyService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.companys = this.compService.getCompanys();
    this.dataSource = new MatTableDataSource(this.companys);

    this.compService.companyChanged.subscribe((updatedCompanies: Company[]) => {
      this.companys = updatedCompanies;
      this.dataSource.data = updatedCompanies;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCompany(id: number) {
    this.compService.deleteCompany(id);
  }

  openEditForm(id: number) {
    const dialogRef = this.dialog.open(CompanyFormComponent, {
      data: { companyId: id }, // pass id
    });
  }
}
