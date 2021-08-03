import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  barChartOption1: EChartsOption
  barChartOption2: EChartsOption
  barChartOption3: EChartsOption
  barChartOption4: EChartsOption

  pieChartOption1: EChartsOption
  pieChartOption2: EChartsOption
  pieChartOption3: EChartsOption

  constructor(
    public dbs: DatabaseService
  ) { }

  ngOnInit(): void {
    this.initGraph()
  }

  initGraph() {
    this.barChartOption1 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Índice de reencauche(%)',
          type: 'bar',
          barWidth: '60%',
          data: [0, 0, 9.41, 11.37, 22.33, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    }
    this.barChartOption2 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Índice de reencauchabilidad',
          type: 'bar',
          barWidth: '60%',
          data: [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    }
    this.barChartOption3 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [
            'X MULTI D', 'X MULTI Z', 'XZY3', 'AGC228', 'M320', 'X WORKS Z', 'MY507',
            'M748', 'L315', 'HSR2', 'AM15', 'M840', '104ZR', 'TZY2', 'BANDAG', 'TZY3', 'IZY3', 'R-XZY3'
          ],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Por Modelo',
          type: 'bar',
          barWidth: '60%',
          data: [24, 13, 11, 8, 6, 4, 4, 4, 3, 2, 2, 1, 1, 31, 8, 6, 4, 2]
        }
      ]
    }
    this.barChartOption4 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['295/80R22.5', '425/65R22.5', '11R22.5', '275/70R22.5'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Neumático',
          type: 'bar',
          barWidth: '60%',
          data: [78, 38, 10, 8]
        }
      ]
    }

    this.pieChartOption1 = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right',
      },
      series: [
        {
          name: 'Marca',
          type: 'pie',
          radius: '60%',
          label: {
            //position: 'inner',
            formatter: [
              '{title|{b}}',
              '{value|{c}-{d}%}'
            ].join('\n'),
            rich: {
              title: {
                fontSize: 12,
                align: 'center'
              },
              value: {
                fontSize: 10,
                padding: [5, 0, 0, 0],
                align: 'center'
              }
            }
          },
          data: [
            { value: 412, name: 'Kumho' },
            { value: 359, name: 'Yokohama' },
            { value: 159, name: 'Jinyu' },
            { value: 110, name: 'Techking' },
            { value: 102, name: 'Otros' }
          ]
        }
      ]
    }
    this.pieChartOption2 = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right',
      },
      series: [
        {
          name: 'Condición',
          type: 'pie',
          radius: '60%',
          label: {
            //position: 'inner',
            formatter: [
              '{title|{b}}',
              '{value|{c}-{d}%}'
            ].join('\n'),
            rich: {
              title: {
                fontSize: 12,
                align: 'center'
              },
              value: {
                fontSize: 10,
                padding: [5, 0, 0, 0],
                align: 'center'
              }
            }
          },
          data: [
            { value: 102, name: 'Reencauchado' },
            { value: 1040, name: 'Nuevo' }
          ]
        }
      ]
    }
    this.pieChartOption3 = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right',
      },
      series: [
        {
          name: 'Estado',
          type: 'pie',
          radius: '60%',
          label: {
            //position: 'inner',
            formatter: [
              '{title|{b}}',
              '{value|{c}-{d}%}'
            ].join('\n'),
            rich: {
              title: {
                fontSize: 12,
                align: 'center'
              },
              value: {
                fontSize: 10,
                padding: [5, 0, 0, 0],
                align: 'center'
              }
            }
          },
          data: [
            { value: 494, name: 'Por instalar' },
            { value: 648, name: 'Instalado' }
          ]
        }
      ]
    }
  }


}
