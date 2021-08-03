import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersService } from 'src/app/services/customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-plant',
  templateUrl: './register-plant.component.html',
  styleUrls: ['./register-plant.component.scss']
})
export class RegisterPlantComponent implements OnInit {
  registerForm: FormGroup
  buttonSubmit = false

  constructor(
    public dialogRef: MatDialogRef<RegisterPlantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private customerService: CustomersService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [this.data.row ? this.data.row.nombre : null, Validators.required],
      address: [this.data.row ? this.data.row.direccion : null, Validators.required]
    })
    console.log(this.data.row)
  }

  save() {
    this.registerForm.markAllAsTouched()
    if (this.registerForm.invalid) {
      return;
    }
    this.buttonSubmit = true
    const formAdd = new FormData();
    formAdd.append('nombre', this.registerForm.get('name').value);
    formAdd.append('direccion', this.registerForm.get('address').value);
    formAdd.append('cliente_id', this.data.id);

    if(this.data.row){
      formAdd.append('planta_id', this.data.row.id);
      this.customerService.editPlant(formAdd).subscribe(res => {
        console.log(res)
        this.buttonSubmit = false
        Swal.fire({
          title: 'Editado',
          text: 'Se guardo los cambios',
          icon: 'success',
          heightAuto: false
        })
        this.dialogRef.close({action:true})
      })
    }else{
      this.customerService.createPlant(formAdd).subscribe(res => {
        console.log(res)
        this.buttonSubmit = false
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

}
