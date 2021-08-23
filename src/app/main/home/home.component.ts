import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre']
  data1 = [0, 0, 9.41, 11.37, 22.33, 0, 0, 0, 0, 0, 0, 0]
  data2 = [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
  brands = [
    'X MULTI D', 'X MULTI Z', 'XZY3', 'AGC228', 'M320', 'X WORKS Z', 'MY507',
    'M748', 'L315', 'HSR2', 'AM15', 'M840', '104ZR', 'TZY2', 'BANDAG', 'TZY3', 'IZY3', 'R-XZY3'
  ]
  data3 = [24, 13, 11, 8, 6, 4, 4, 4, 3, 2, 2, 1, 1, 31, 8, 6, 4, 2]
  tiers = ['295/80R22.5', '425/65R22.5', '11R22.5', '275/70R22.5']
  data4 = [78, 38, 10, 8]

  dataP1=[
    { value: 412, name: 'Kumho' },
    { value: 359, name: 'Yokohama' },
    { value: 159, name: 'Jinyu' },
    { value: 110, name: 'Techking' },
    { value: 102, name: 'Otros' }
  ]
  dataP2=[
    { value: 102, name: 'Reencauchado' },
    { value: 1040, name: 'Nuevo' }
  ]
  dataP3=[
    { value: 494, name: 'Por instalar' },
    { value: 648, name: 'Instalado' }
  ]

  constructor(
    public dbs: DatabaseService
  ) { }

  ngOnInit(): void {
  }


}
