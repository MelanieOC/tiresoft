import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  dataFormGroup: FormGroup;

  hidePass: boolean = true;
  load: boolean = false

  ruta: string = '/main/clientes'
  customer$: Observable<any>
  user: any
  constructor(
    private fb: FormBuilder,
    public router: Router,
    private dbs: DatabaseService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.user.value
    this.customer$ = this.auth.user$
    this.dataFormGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      pass: [null, [Validators.required]]
    });

    if (this.user) {
      this.getClient(false)
    }
  }

  login() {

    this.load = true
    let data = this.dataFormGroup.value
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.pass);

    this.auth.login(formData).subscribe((response: any) => {
      this.getClient(true)
    }, error => {
      this.load = false
      Swal.fire({
        title: 'Error',
        text: 'Problema al iniciar sesión, usuario o contraseña incorrecto',
        icon: 'error',
        heightAuto: false
      })
    });
  }

  getClient(init) {
    let user = this.auth.user.value
    const formUser = new FormData();
    formUser.append('user_id', user.id);
    this.dbs.getClientList(formUser).subscribe(res => {
      if (res['data']) {
        let clients = res['data'].length
        this.dbs.customers.next(res['data'])
        if (clients == 1) {
          this.dbs.customerSelect.next(res['data'][0])
          localStorage.setItem('client_tiresoft', JSON.stringify(res['data'][0]));
          this.ruta = '/main/home'
        }

        if (init) {
          this.load = false
          //this.goInit()
        }
      }

    })
  }

  goInit() {
    if (this.dbs.customerSelect.value) {
      this.router.navigate(['/main/home'])
    } else {
      this.router.navigate([this.ruta])
    }

  }

  logout() {
    this.auth.logout()
  }
}
