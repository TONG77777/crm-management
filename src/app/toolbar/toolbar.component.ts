import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyFormComponent } from '../companys/company-form/company-form.component'; // Adjust the path accordingly

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private _dialog: MatDialog) { }

  openAddEditEmpForm() {
    this._dialog.open(CompanyFormComponent);
  }

  ngOnInit(): void {
  }

}

