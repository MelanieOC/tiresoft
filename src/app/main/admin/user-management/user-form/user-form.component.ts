import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { RolesService } from 'src/app/services/roles.service';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  title = 'Crear Usuario';
  roles = []
  business = []
  edit = false
  userEdit = null

  userForm = this.formBuilder.group({
    name: [null, Validators.required],
    lastName: [null, Validators.required],
    phone: [null],
    role: [null, Validators.required],
    business: [null, Validators.required],
    password: [null, Validators.required],
    passwordTwo: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]]
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

  hidePass: boolean = true;
  hidePassRe: boolean = true;

  buttonSubmit = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private roleService: RolesService,
    private customerService: CustomersService,
    private ng2ImgMax: Ng2ImgMaxService
  ) { }

  ngOnInit(): void {
    combineLatest(
      this.roleService.getRoles(),
      this.customerService.getList()
    ).subscribe(([roles, clientes]) => {
      this.roles = roles['data']
      this.business = clientes['data']
    })

    if (this.activatedRoute.snapshot.params.id) {
      this.title = 'Editar Usuario';
      this.edit = true
      const formAdd = new FormData();
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
      });
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
    this.userForm.markAllAsTouched()
    if (this.userForm.invalid) {
      return;
    }

    this.buttonSubmit = true
    const val = this.userForm.value

    const formAdd = new FormData();
    formAdd.append('nombres', val.name);
    formAdd.append('apellidos', val.lastName);
    formAdd.append('telefono', val.phone);
    formAdd.append('email', val.email);
    formAdd.append('password', val.password);
    formAdd.append('password_confirmation', val.passwordTwo);
    formAdd.append('imagen_firma', this.photoFile || '');
    formAdd.append('role_id', val.role);
    formAdd.append('empresas', val.business.join(','));

    this.userService.register(formAdd).subscribe(res => {
      console.log(res)
      this.buttonSubmit = false
      Swal.fire({
        title: 'Usuario Creado',
        icon: 'success',
        heightAuto: false
      })
    }, error => {
      if (error.status === 400) {
        this.errors(error);
      }
      this.buttonSubmit = false
    })

  }

  saveEdit() {
    console.log('edit')
    this.userForm.markAllAsTouched()
    if (this.userForm.invalid) {
      return;
    }
    const val = this.userForm.value
    const userData = this.userEdit.name != val.name || this.userEdit.lastName != val.lastName ||
      this.userEdit.phone != val.phone || this.userEdit.role != val.role ||
      this.userEdit.business.join(',') != val.business.join(',')

    const userPass = this.userEdit.password != val.password || this.userEdit.passwordTwo != val.passwordTwo
      || this.userEdit.email != val.email


    console.log(userData)
    console.log(userPass)
  }

  errors(error) {
    if (error.error.errors) {
      if (error.error.errors.email) {
        this.showAlert(error.error.errors.email[0])
      }
      if (error.error.errors.password) {
        this.showAlert('No coincide las contraseñas')
      }
    } else {
      this.showAlert(error.error.message)
    }
  }

  showAlert(message) {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      heightAuto: false
    })
  }
}
