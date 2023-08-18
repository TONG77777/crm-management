import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Company2Service } from '../services/company2.service';
import { CompanyFormComponent } from './company-form/company-form.component';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-companys',
  templateUrl: './companys.component.html',
  styleUrls: ['./companys.component.css'],
})
export class CompanysComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'priority',
    'date-add',
    'notes',
    'menu',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private compService: Company2Service,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCompanyList();
  }

  getCompanyList() {
    this.compService.getCompanyList().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCompany(id: number) {
    this.compService.deleteCompany(id).subscribe({
      next: (res) => {
        alert('Delete Company Successfully');
        this.getCompanyList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this.dialog.open(CompanyFormComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCompanyList();
        }
      },
      error: console.log,
    });
  }

  openAddForm() {
    const dialogRef = this.dialog.open(CompanyFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCompanyList();
        }
      },
      error: console.log,
    });
  }
}
