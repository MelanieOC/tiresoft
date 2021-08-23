import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { RolesService } from 'src/app/services/roles.service';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.scss']
})
export class CustomersFormComponent implements OnInit {
  title = 'Crear Cliente';
  edit = false

  customerForm = this.formBuilder.group({
    name: [null, Validators.required],
    ruc: [null, Validators.required],
    address: [null]
  });

  photo: any = null
  photoFile: any = null

  photos: {
    resizing$: {
      photoURL: Observable<boolean>,
    },
    data: {
      photoURL: File,
    }
  } = {
      resizing$: {
        photoURL: new BehaviorSubject<boolean>(false),
      },
      data: {
        photoURL: null,
      }
    }


  buttonSubmit = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roleService: RolesService,
    private customerService: CustomersService,
    private ng2ImgMax: Ng2ImgMaxService
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.id) {
      this.title = 'Editar Cliente';
      this.edit = true
      /*const formAdd = new FormData();
      formAdd.append('user_id', this.activatedRoute.snapshot.params.id);
      this.userService.getUser(formAdd).subscribe(res => {
        this.userEdit = {
          name: res['user'].nombres,
          lastName: res['user'].apellidos,
          phone: res['user'].telefono,
          role: res['user'].role.length ? res['user'].role[0].role_id : null,
          business: res['user'].clientes.map(cl => cl.id_cliente),
          password: null,
          passwordTwo: null,
          email: res['user'].email
        }

        this.userForm.setValue(this.userEdit)
        this.userForm.get('password').clearValidators();
        this.userForm.get('password').updateValueAndValidity();
        this.userForm.get('passwordTwo').clearValidators();
        this.userForm.get('passwordTwo').updateValueAndValidity();
        this.photo = res['user'].img_firma ? this.userService.getImageUrl(res['user'].img_firma) : null
        console.log(res)
      });*/
    }
  }

  addNewPhoto(formControlName: string, image: File[]) {
    this.photo = null;
    if (image.length === 0)
      return;
    //this.tempImage = image[0];
    let reader = new FileReader();

    this.photos.resizing$[formControlName].next(true);

    this.ng2ImgMax.resizeImage(image[0], 10000, 426)
      .pipe(take(1)).subscribe(
        result => {
          this.photos.data[formControlName] = new File([result], result.name);
          this.photoFile = new File([result], result.name);
          reader.readAsDataURL(result);
          reader.onload = (_event) => {
            this.photo = reader.result;
            this.photos.resizing$[formControlName].next(false);
          }
        },
        error => {
          this.photos.resizing$[formControlName].next(false);
          Swal.fire({
            text: 'Por favor, elija una imagen en formato JPG, o PNG',
            icon: 'info',
            heightAuto: false
          });
          this.photo = null;

        }
      );
  }

  save() {
    this.customerForm.markAllAsTouched()
    if (this.customerForm.invalid) {
      return;
    }

    //this.buttonSubmit = true
    
  }

  saveEdit() {
    console.log('edit')
    this.customerForm.markAllAsTouched()
    if (this.customerForm.invalid) {
      return;
    }

    //this.buttonSubmit = true
    
  }

}
