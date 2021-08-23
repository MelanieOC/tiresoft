import { Component, OnInit, Input } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() type: number
  @Input() label: string
  @Input() data: any[]

  pieChartOption: EChartsOption
  pieChartOption2: EChartsOption

  constructor() { }

  ngOnInit(): void {
    this.pieChartOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right',
      },
      series: [
        {
          name: this.label,
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
          data: this.data
        }
      ]
    }

    this.pieChartOption2 = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        top: 'bottom'
      },
      series: [
        {
          name: this.label,
          type: 'pie',
          radius: '70%',
          label: {
            position: 'inner',
            formatter: '{c}',
            fontSize: 14
          },
          data: this.data
        }
      ]
    };
  }

}
