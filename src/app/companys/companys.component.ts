
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Company } from './company.model'; // Import the Company class
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-companys',
  templateUrl: './companys.component.html',
  styleUrls: ['./companys.component.css'],
})
export class CompanysComponent implements OnInit {
  companys: Company[];
  displayedColumns: string[] = ['id', 'name', 'priority', 'date-add', 'notes'];
  dataSource: MatTableDataSource<Company>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private compService: CompanyService, 
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.companys = this.compService.getCompanys(); // Make sure this is of type Company[]
    this.dataSource = new MatTableDataSource(this.companys); // This should be compatible with MatTableDataSource<Company>
  }
}
