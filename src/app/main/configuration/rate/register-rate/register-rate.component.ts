import { LOCALE_ID, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { RateService } from 'src/app/services/rate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-rate',
  templateUrl: './register-rate.component.html',
  styleUrls: ['./register-rate.component.scss']
})
export class RegisterRateComponent implements OnInit {

  registerForm: FormGroup
  buttonSubmit = false

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    public dialogRef: MatDialogRef<RegisterRateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private rateService: RateService
  ) { }

  ngOnInit(): void {
    const today = new Date()
    this.registerForm = this.formBuilder.group({
      indicator: [null, Validators.required],
      date: [formatDate(today, 'dd/MM/yyyy', this.locale)]
    })
  }

  save() {
    this.registerForm.markAllAsTouched()
    if(this.registerForm.invalid){
      return;
    }
    this.buttonSubmit = true
    const formDelete = new FormData();
    formDelete.append('valor', this.registerForm.get('indicator').value);
    formDelete.append('fecha', this.registerForm.get('date').value);

    this.rateService.createRate(formDelete).subscribe(res=>{
      console.log(res)
      Swal.fire({
        title: 'Creado',
        text: 'Se creo el registro',
        icon: 'success',
        heightAuto: false
      })
      this.dialogRef.close({action:true})
    })
    
  }
}
