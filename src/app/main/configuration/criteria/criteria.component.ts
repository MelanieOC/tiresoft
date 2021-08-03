import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterCriteriaComponent } from './register-criteria/register-criteria.component';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit {

  indicators: any = [
    { name: 'Costo por kilómetro', value: 1 },
    { name: 'Costo por hora', value: 2 },
    { name: 'Índice de reencauche', value: 3 },
    { name: 'Índice de reencauchabilidad', value: 4 }
  ]
  years: any = [2015, 2016, 2017, 2018, 2019, 2020, 2021]

  filterForm: FormGroup

  allData: any = []
  data: any = []
  columns = [
    { name: '', slug: 'options', stick: true },
    { name: 'ID', slug: 'id', stick: true },
    { name: 'Modelo', slug: 'model', stick: true },
    { name: 'Medida', slug: 'measure', stick: true },
    { name: 'Criterio Superior', slug: 'sup', stick: false },
    { name: 'Criterio Tolerable máximo', slug: 'max', stick: false },
    { name: 'Criterio Tolerable mínimo', slug: 'min', stick: false },
    { name: 'Criterio inferior', slug: 'inf', stick: false },
    { name: 'Criterio de Aceptación', slug: 'acept', stick: true }
  ]

  actions = [
    { icon: 'edit', id: 1 }
  ]


  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      indicator: [1],
      year: [2021]
    })
  }

  editRegister(res) {
    const row = res.row
    console.log(row)

  }

  optionsDialog(res) {
    console.log(res)
  }

  openDialog() {
    this.dialog.open(RegisterCriteriaComponent, {
      width: '800px',
      disableClose: true,
      autoFocus: false
    })
  }
}
