import { LOCALE_ID, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatNumber } from '@angular/common';
import Swal from 'sweetalert2';
import { AplicationService } from 'src/app/services/aplication.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-register-remainder',
  templateUrl: './register-remainder.component.html',
  styleUrls: ['./register-remainder.component.scss']
})
export class RegisterRemainderComponent implements OnInit {

  registerForm: FormGroup
  buttonSubmit = false

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    public dialogRef: MatDialogRef<RegisterRemainderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private appService: AplicationService,
    private dbs: DatabaseService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      app: [this.data ? this.data.aplicacion : null, Validators.required],
      reminder: [this.data ? this.data.para_reencacuche : null],
      max: [this.data ? this.data.prox_reencauche : null]
    })
  }

  save() {
    this.registerForm.markAllAsTouched()
    if (this.registerForm.invalid) {
      return;
    }
    this.buttonSubmit = true
    const formAdd = new FormData();
    formAdd.append('aplicacion', this.registerForm.get('app').value);
    formAdd.append('para_reencacuche', this.registerForm.get('reminder').value);
    formAdd.append('prox_reencauche', this.registerForm.get('max').value);
    formAdd.append('cliente_id', this.dbs.customerSelect.value.id_cliente);

    if (this.data) {
      formAdd.append('id_aplicacion', this.data.id_aplicacion);
      this.appService.edit(formAdd).subscribe(res => {
        this.buttonSubmit = false
        Swal.fire({
          title: 'Editado',
          text: 'Se guardo los cambios',
          icon: 'success',
          heightAuto: false
        })
        this.dialogRef.close({ action: true })
      })
    } else {
      this.appService.create(formAdd).subscribe(res => {
        this.buttonSubmit = false
        Swal.fire({
          title: 'Creado',
          text: 'Se creo el registro',
          icon: 'success',
          heightAuto: false
        })
        this.dialogRef.close({ action: true })
      })
    }
  }

}
