import { Component, OnInit } from '@angular/core';
import { Vessel } from '../vessels/vessel.model';
import { MatDialog } from '@angular/material/dialog';
import { VesselFormComponent } from '../vessels/vessel-form/vessel-form.component';

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css'],
})
export class VesselsComponent implements OnInit {
  vessels: Vessel[] = [
    new Vessel(
      'Vessel 1',
      '#V00001',
      '192.168.0.251',
      'Remote Desktop',
      'vessel@example.com',
      'The vessel, a majestic oceanic giant, navigates through azure waves, defying the horizon s embrace. Its towering mast dances with the winds rhythm, whispering tales of distant lands. A canvas of sails captures sunbeams, illuminating its voyage. '
    ),
    new Vessel(
      'Vessel 2',
      '#V00002',
      '192.168.0.252',
      'TeamViewer',
      'vessel2@example.com',
      'The vessel, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
    ),
    new Vessel(
      'Vessel 2',
      '#V00002',
      '192.168.0.252',
      'TeamViewer',
      'vessel2@example.com',
      'The vessel, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
    ),
    new Vessel(
      'Vessel 2',
      '#V00002',
      '192.168.0.252',
      'TeamViewer',
      'vessel2@example.com',
      'The vessel, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
    ),
    new Vessel(
      'Vessel 2',
      '#V00002',
      '192.168.0.252',
      'TeamViewer',
      'vessel2@example.com',
      'The vessel, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
    ),
    new Vessel(
      'Vessel 2',
      '#V00002',
      '192.168.0.252',
      'TeamViewer',
      'vessel2@example.com',
      'The vessel, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
    ),
    new Vessel(
      'Vessel 2',
      '#V00002',
      '192.168.0.252',
      'TeamViewer',
      'vessel2@example.com',
      'The vessel, a majestic ship that gracefully navigates the open seas, holds a captivating allure.'
    ),
  ];
  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('vessel detail load!');
  }

  openVesselForm() {
    this._dialog.open(VesselFormComponent);
  }
  applyFilter($event) {}
}
