import { Component, OnInit, Inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-vessel-form',
  templateUrl: './vessel-form.component.html',
  styleUrls: ['./vessel-form.component.css']
})
export class VesselFormComponent implements OnInit {
  connections: string[] = ['Remote Desktop', 'TeamViewer'];
  vesselForm: FormGroup;
  isEditMode: boolean = false;
  initialFormState: any;
  CompanyVessels = new FormArray([]);
  companyId: number;

  constructor(
    private fb: FormBuilder,
    private compService: CompanyService,
    private dialogRef: MatDialogRef<VesselFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.vesselForm = this.fb.group({
      vesselName: '',
      code: '',
      ip_add: '',
      connection: '',
      vpn: '',
      notes: '',
      vessels: this.CompanyVessels,
    });
    this.initialFormState = this.vesselForm.value;
    this.CompanyVessels = this.fb.array([]);
  }

  get vesselControls() {
    return (this.vesselForm.get('vessels') as FormArray).controls;
  }

  ngOnInit(): void {
    if(this.data.isEditMode){
      this.isEditMode = true; 
      const companyId = this.data.companyId;
      const vesselIndex = this.data.vesselIndex;
      const company = this.compService.getCompanyById(companyId);
      const vessel = company.vessels[vesselIndex];
      this.vesselForm.patchValue(vessel);
    }
  }
  onReset() {
    if (!this.isEditMode) {
      this.vesselForm.setValue(this.initialFormState);
    }
  }

  
  generateNewVesselId(): number {
    const existingVessels = this.vesselControls.map(
      (control) => control.value
    );
    const maxId = Math.max(
      ...existingVessels.map((vessel) => vessel.vesselId)
    );
    return maxId + 1;
  }

  onVesselFormSubmit() {
    if (this.isEditMode) {
      const companyId = this.data.companyId;
      const vesselIndex = this.data.vesselIndex;
      const company = this.compService.getCompanyById(companyId);
      company.vessels[vesselIndex] = this.vesselForm.value;
    } else {
      const newvesselFormGroup = this.fb.group({
        vesselName: this.vesselForm.value.vesselName,
        code: this.vesselForm.value.code,
        ip_add: this.vesselForm.value.ip_add,
        connection: this.vesselForm.value.connection,
        vpn: this.vesselForm.value.vpn,
        notes: this.vesselForm.value.notes,
      });
      console.log(this.vesselForm.value);
      console.log('Add vessel successfully');

      (this.vesselForm.get('vessels') as FormArray).push(newvesselFormGroup);

      const newVessel = {
        vesselId: this.generateNewVesselId(),
        vesselName: newvesselFormGroup.value.vesselName,
        code: newvesselFormGroup.value.code,
        ip_add: newvesselFormGroup.value.ip_add,
        connection: newvesselFormGroup.value.connection,
        vpn: newvesselFormGroup.value.vpn,
        notes: newvesselFormGroup.value.notes,
      };

      const companyId = this.data.companyId;
      const company = this.compService.getCompanyById(companyId);
      company.vessels.push(newVessel);
    }
    this.dialogRef.close();
    this.vesselForm.reset();
  }
}
