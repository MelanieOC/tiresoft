import { Component, OnInit, Input } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() type: number
  @Input() label: string
  @Input() dataX: any[]
  @Input() dataY: any[] = []

  barChartOption: EChartsOption
  barChartOption2: EChartsOption

  constructor() { }

  ngOnInit(): void {
    this.barChartOption = {
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
          data: this.dataX,
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
          name: this.label,
          type: 'bar',
          barWidth: '60%',
          data: this.dataY
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
        right: '3%',
        bottom: '0%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: this.dataX,
        inverse: true
      },
      series: [{
        label: {
          show: true,
          position: 'right'
        },
        data: this.dataY,
        type: 'bar'
      }]
    };

  }

}
