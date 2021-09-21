import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-retread-index',
  templateUrl: './retread-index.component.html',
  styleUrls: ['./retread-index.component.scss']
})
export class RetreadIndexComponent implements OnInit {

  year = new FormControl(2021)
  years: any = [2015, 2016, 2017, 2018, 2019, 2020, 2021]
  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre']
  data1 = [0, 0, 9.41, 11.37, 15.36, 12.08, 11.48, 33.33, 0, 0, 0, 0]

  constructor() { }

  ngOnInit(): void {
  }

}
