import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  allData: any = [
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' },
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' },
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' },
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' },
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' },
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' },
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' },
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' },
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' },
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' },
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' },
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' },
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' },
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' },
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' },
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' },
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' },
    { id: 1, name: 'Usuario Tiresoft', rol: 'Usuario', email: 'usuario@tiresoft.pe', firm: 'Sí', date: '2021-06-10' }
  ]

  data: any = []
  columns = [
    { name: 'ID', slug: 'id', stick: true },
    { name: 'Rol', slug: 'rol', stick: false },
    { name: 'Nombre', slug: 'name', stick: true },
    { name: 'Email', slug: 'email', stick: false },
    { name: 'Firma', slug: 'firm', stick: false },
    { name: 'Fecha', slug: 'date', stick: false },
    { name: '', slug: 'options', stick: true }
  ]

  actions = [
    { icon: 'edit', id: 1 },
    { icon: 'delete', id: 2 }
  ]

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    /*this.userService.getList().subscribe(res=>{
      console.log(res)
    })*/
  }

  getAction(data) {
    switch (data.type) {
      case 1:
        this.editRegister(data.row)
        break;
      case 2:
        this.optionsDialog(data.row)
        break;
      default:
        break;
    }
  }

  editRegister(res) {
    console.log(res)
  }

  optionsDialog(res) {
    console.log(res)
  }

}
