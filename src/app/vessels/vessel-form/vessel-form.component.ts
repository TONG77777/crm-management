import { Component, OnInit, Inject, HostListener } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vessel } from '../vessel.model';
import { VesselService } from 'src/app/services/vessel.service';

@Component({
  selector: 'app-vessel-form',
  templateUrl: './vessel-form.component.html',
  styleUrls: ['./vessel-form.component.css'],
})
export class VesselFormComponent implements OnInit {
  connections: string[] = ['Remote Desktop', 'TeamViewer'];
  vesselForm: FormGroup;
  isEditMode: boolean = false;
  initialFormState: any;

  constructor(
    private fb: FormBuilder,
    private vesService: VesselService,
    private dialogRef: MatDialogRef<VesselFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.vesselForm = this.fb.group({
      companyId: '',
      vesselName: '',
      code: '',
      ip_add: '',
      connection: '',
      vpn: '',
      notes: '',
    });
    this.initialFormState = this.vesselForm.value;
  }
  @HostListener('document:keydown.enter', ['$event'])
  preventSubmit(event: KeyboardEvent): void {
    event.preventDefault();
  }

  ngOnInit(): void {
    if (this.data.isEditMode) {
      this.isEditMode = true;
      this.vesselForm.patchValue(this.data);
    }
  }
  onReset() {
    const isEditMode = this.data.isEditMode;
    if (!isEditMode) {
      this.vesselForm.setValue(this.initialFormState);
    } else {
      this.dialogRef.close();
    }
  }

  onVesselFormSubmit() {
    if (this.vesselForm.valid) {
      const companyId = this.data.companyId;
      const isEditMode = this.data.isEditMode;

      if (isEditMode) {
        const editVessel: Vessel = {
          id: this.data.id,
          companyId: companyId,
          vesselName: this.vesselForm.value.vesselName,
          code: this.vesselForm.value.code,
          ip_add: this.vesselForm.value.ip_add,
          connection: this.vesselForm.value.connection,
          vpn: this.vesselForm.value.vpn,
          notes: this.vesselForm.value.notes,
        };

        this.vesService.updateVessels(this.data.id, editVessel).subscribe({
          next: (val: any) => {
            alert('Vessel Edit Successfully');
            this.vesService.getVesselsByCompanyId(companyId).subscribe({
              next: (res) => {
                this.dialogRef.close(true);
              },
              error: console.log,
            });
          },
          error: console.log,
        });
      } else {
        const newVessel: Vessel = {
          id: 0,
          companyId: companyId,
          vesselName: this.vesselForm.value.vesselName,
          code: this.vesselForm.value.code,
          ip_add: this.vesselForm.value.ip_add,
          connection: this.vesselForm.value.connection,
          vpn: this.vesselForm.value.vpn,
          notes: this.vesselForm.value.notes,
        };

        this.vesService.addVesselsByCompanyId(companyId, newVessel).subscribe({
          next: (val: any) => {
            alert('Vessel Added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
      this.vesselForm.reset();
    }
  }
}
