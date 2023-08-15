import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vessel-form',
  templateUrl: './vessel-form.component.html',
  styleUrls: ['./vessel-form.component.css']
})
export class VesselFormComponent implements OnInit {
  connections: string[] = ['Remote Desktop', 'TeamViewer'];
  constructor() { }

  ngOnInit(): void {
  }

}
