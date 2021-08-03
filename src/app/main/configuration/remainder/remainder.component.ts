import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterRemainderComponent } from './register-remainder/register-remainder.component';

@Component({
  selector: 'app-remainder',
  templateUrl: './remainder.component.html',
  styleUrls: ['./remainder.component.scss']
})
export class RemainderComponent implements OnInit {

  allData: any = [
    { name: 'REGIONAL', recaunch: '', next: '' },
    { name: 'MIXTA', recaunch: '', next: '' },
    { name: 'URBANO', recaunch: '', next: '' },
    { name: 'UNDERGROUND', recaunch: '', next: '' }
  ]

  columns = [
    { name: '', slug: 'options', stick: true },
    { name: 'Aplicación', slug: 'name', stick: true },
    { name: 'Para Reencauche', slug: 'recaunch', stick: true },
    { name: 'Próximo a Reencauche', slug: 'next', stick: true }
  ]

  actions = [
    { icon: 'edit', id: 1 }
  ]

  constructor(
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
   
  }

  editRegister(res) {
    const row = res.row
    console.log(row)
  }

  optionsDialog(res) {
    console.log(res)
  }

  openDialog() {
    this.dialog.open(RegisterRemainderComponent, {
      width: '600px',
      disableClose: true,
      autoFocus: false
    })
  }
}
