import { LOCALE_ID, Inject, Component, OnInit } from '@angular/core';
import { ConsolidatedReportService } from 'src/app/services/consolidated-report.service';
import { DatabaseService } from 'src/app/services/database.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  filterForm: FormGroup
  data: boolean = false
  load = false
  noData = false

  noDataMessage = []

  equipments = []
  serviceList = []
  irregularList = []

  //gráficos
  dataPieTires = []
  dataPieBrand = []
  dataBarD = []
  dataBarT = []
  dataBarA = []

  dataPieTireI = []
  dataPiePreasure = []

  dataPieRetread = []
  dataBarRetreadability = []

  //tablas especiales
  levelsUnit = []
  levelsNum = []
  levelsUnitTotal = []
  levelsDate = []
  levelsMeasureNum = []
  levelsMeasure = []
  levelsMeasureTotal = []

  levelsMeasureSubTotal = []

  costListMonths = []
  costList = []

  allInspections = []
  p: number = 1;

  total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  recommendations = [
    'Monitorear con frecuencia y trabajar con las presiones de inflado recomendadas debido a que las bajas y/o altas presiones incrementan el consumo de combustible y disminuyen la vida útil de los neumáticos.',
    'Cuidar y controlar la altura de los remanentes de rodado, retirando los neumáticos a la altura recomendada (6mm), para prevenir que la carcasa se fatigue y así obtendremos más futuros reencauches.',
    'Evitar trabajar los neumáticos con sobre carga, asimismo evitar giros bruscos y no sobrepasar los límites máximos de velocidad.',
    'Monitorear y evitar los desgastes irregulares en los hombros de los neumáticos, estar alerta a los márgenes de diferencia de desgaste (+/-2.5mm.).',
    'Si se origina desgaste irregular, realizar las rotaciones e inversiones de eje correspondiente.',
    'Mantener la vía o área de operaciones, donde trabaja la unidad, en buen estado y libre de objetos y/o sustancias que puedan dañar al neumático.'
  ]

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private dbs: DatabaseService,
    private reportService: ConsolidatedReportService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      from: [null],
      to: [null]
    })
  }

  onSubmit() {
    this.load = true
    if (this.data) {
      this.reStart()
    }
    let cust = this.dbs.customerSelect.value
    const send = {
      cliente_id: cust.id_cliente,
      f_inicio: formatDate(this.filterForm.get('from').value, 'yyyy-MM-dd', this.locale),
      f_fin: formatDate(this.filterForm.get('to').value, 'yyyy-MM-dd', this.locale)
    }

    let dates = []
    let num = this.monthDiff(this.filterForm.get('from').value, this.filterForm.get('to').value) + 1

    const initM = this.filterForm.get('from').value.getMonth() + 1;
    const initY = this.filterForm.get('from').value.getFullYear()
    let countYears = 0

    for (let index = 0; index < num; index++) {
      let month = initM + index - (12 * countYears)
      if (month > 12) {
        month = month - 12
        countYears++
      }
      let year = initY + countYears
      dates.push(`${year}-${String(month).padStart(2, "0")}`)
    }

    this.levelsDate = dates

    combineLatest(
      this.reportService.getInspectedEquipment(send),//0
      this.reportService.getMeasuresDistribution(send),//1
      this.reportService.getBrandPosition(send),//2
      this.reportService.getBrandEjeD(send),//3
      this.reportService.getBrandEjeT(send),//4
      this.reportService.getBrandEjeA(send),//5
      this.reportService.getBadTires(send),//6
      this.reportService.getRemoveTires(send),//7
      this.reportService.getRemainingLevels(send),//8
      this.reportService.getRetreadService(send),//9
      this.reportService.getWearIrregular(send),//10
      this.reportService.getTireI(send),//11
      this.reportService.getTireIPreasure(send),//12
      this.reportService.getRemaindLevelMeasure(send),//13
      this.reportService.getRetreadIndex(send),//14
      this.reportService.getRetreadabilityIndex(send),//15
      this.reportService.getInspections(send),//16
      this.reportService.getCost(send)//17
    ).subscribe(res => {
      this.load = false
      this.data = res.filter((r, i) => i < 6 || i > 8).reduce((a, b) => a || b['status'], false)
      this.noData = !this.data
      this.noDataMessage = res.map(r => r['message'])
      if (res[0]['status']) {
        this.equipments = res[0]['data']
        this.total[0] = [...res[0]['data']].length
      }
      if (res[1]['status']) {
        this.dataPieTires = [...res[1]['data']].map(dt => {
          return {
            name: dt.medida,
            value: dt.total_medidas
          }
        })

        this.total[1] = [...this.dataPieTires].reduce((a, b) => a + b.value, 0)
      }

      if (res[2]['status']) {
        this.dataPieBrand = [...res[2]['data']].map(dt => {
          return {
            name: dt.marca,
            value: dt.total_marcas
          }
        })
        this.total[2] = [...this.dataPieBrand].reduce((a, b) => a + b.value, 0)
      }
      if (res[5]['status']) {


      }
      if (res[3]['status']) {
        this.dataBarD[0] = [...res[3]['data']].map(dt => dt.marca)
        this.dataBarD[1] = [...res[3]['data']].map(dt => dt.total_marcas)
        this.total[3] = [...this.dataBarD[1]].reduce((a, b) => a + b, 0)
      }
      if (res[4]['status']) {
        this.dataBarT[0] = [...res[4]['data']].map(dt => dt.marca)
        this.dataBarT[1] = [...res[4]['data']].map(dt => dt.total_marcas)
        this.total[4] = [...this.dataBarT[1]].reduce((a, b) => a + b, 0)
      }
      if (res[8]['status'] && res[8]['data']) {
        const maxNum = res[8]['posicion_maxima']
        for (let index = 1; index <= maxNum; index++) {
          this.levelsNum.push(index)
        }
        let placas = [...res[8]['data']].map(dt => dt.placa).filter((dt, ind, arr) => arr.indexOf(dt) === ind)
        
        let levels = []
        for (let i = 0; i < placas.length; i++) {
          let repites = [...res[8]['data']].filter(r => r.placa == placas[i])
          let count = 0
          for (let j = 0; j < this.levelsDate.length; j++) {
            let positions = []
            for (let index = 1; index <= maxNum; index++) {
              const element = repites.find(rp => rp.posicion == index && rp.fecha == this.levelsDate[j])
              let color = 'white'
              if (element) {
                const num = Number(element.NSD_min)
                if (num <= (Number(element.rem_para_reencauche_proximo) + 1)) {
                  color = 'blue'
                }
                if (num <= Number(element.rem_para_reencauche)) {
                  color = 'orange'
                }
                positions.push({ name: num, color })
              } else {
                positions.push({ name: '--', color })
              }
            }
            if (positions.filter(pt => pt.name != '--').length > 0) {
              levels.push({
                ind: count,
                nomtipo: repites[0].nomtipo,
                fecha: this.levelsDate[j] + '-15',
                placa: repites[0].placa,
                positions,
                remind: positions.filter(p => p.color == 'orange').length,
                next: positions.filter(p => p.color == 'blue').length,
                total: repites.filter(r => r.fecha == this.levelsDate[j]).length
              })
              count++
            }
          }
        }

        this.levelsUnit = levels.map((lv, ind, arr) => {
          let num = arr.filter(r => r.placa == lv.placa)
          return { ...lv, pos: num.length }
        })

        const num1 = this.levelsUnit.reduce((a, b) => a + b.remind, 0)
        const num2 = this.levelsUnit.reduce((a, b) => a + b.next, 0)
        const numT = this.levelsUnit.reduce((a, b) => a + b.total, 0)
        this.levelsUnitTotal = [
          numT, num1, num2,
          this.calculatePercent(num1, numT),
          this.calculatePercent(num2, numT)
        ]
      }
      if (res[9]['status']) {
        this.serviceList = res[9]['data']
        this.total[9] = [...res[9]['data']].length
      }
      if (res[10]['status']) {
        this.irregularList = res[10]['data']
        this.total[10] = [...res[10]['data']].length
      }
      if (res[11]['status']) {
        this.dataPieTireI = [...res[11]['data']].map(dt => {
          return {
            name: dt.tipo_inflado,
            value: dt.total
          }
        })
        this.total[11] = [...this.dataPieTireI].reduce((a, b) => a + b.value, 0)
      }
      if (res[12]['status']) {
        this.dataPiePreasure = [
          {
            name: 'Presión alta',
            value: res[12]['presion_totales'][0]['presion_alta']
          },
          {
            name: 'Presión baja',
            value: res[12]['presion_totales'][0]['presion_baja']
          },
          {
            name: 'Presión recomendada',
            value: res[12]['presion_totales'][0]['presion_recomendada']
          }
        ]

        this.total[12] = [...this.dataPiePreasure].reduce((a, b) => a + b.value, 0)
      }

      if (res[13]['status'] && res[16]['status']) {
        const order = [...res[16]['data']].map(dt => Number(dt.NSD))
        const minN = order.sort((a, b) => a - b)[0]
        const maxN = order.sort((a, b) => b - a)[0]

        for (let index = minN; index <= maxN; index++) {
          this.levelsMeasureNum.push(index)
          this.levelsMeasureTotal.push([...res[16]['data']].filter(rp => Number(rp.NSD) == index).length)
        }

        let level = [...res[16]['data']].map((dt, ind, arr) => {
          let repites = arr.filter(r => r.medida_neumatico == dt.medida_neumatico && r.tipo_vehiculo == dt.tipo_vehiculo)
          let measures = []
          for (let index = minN; index <= maxN; index++) {
            const elements = repites.filter(rp => Number(rp.NSD) == index)
            let color = 'white'

            if (index <= 7) {
              color = 'blue'
            }
            if (index <= 5) {
              color = 'orange'
            }
            measures.push({ total: elements.length, color })

          }
          return {
            tipo: dt.tipo_vehiculo,
            medida: dt.medida_neumatico,
            first: arr.findIndex(r => r.medida_neumatico == dt.medida_neumatico && r.tipo_vehiculo == dt.tipo_vehiculo) === ind,
            measures,
            total: repites.length,
            orange: measures.filter(ms => ms.color == 'orange').reduce((a, b) => a + b.total, 0),
            blue: measures.filter(ms => ms.color == 'blue').reduce((a, b) => a + b.total, 0)
          }
        })

        this.levelsMeasure = level.filter(lv => lv.first)
          .sort((a, b) => (a.medida > b.medida) ? 1 : ((b.medida > a.medida) ? -1 : 0))
        this.levelsMeasureTotal.push([...res[16]['data']].length)

        const numT = [...res[16]['data']].length
        const num1 = this.levelsMeasure.reduce((a, b) => a + b.orange, 0)
        const num2 = this.levelsMeasure.reduce((a, b) => a + b.blue, 0)
        this.levelsMeasureSubTotal = [
          this.levelsMeasureNum.filter(n => n <= 5).length,
          num1,
          2,
          num2,
          this.levelsMeasureNum.filter(n => n > 7).length + 1,
          this.calculatePercent(num1, numT),
          this.calculatePercent(num2, numT),
          numT - (num1 + num2),
          this.calculatePercent(numT - (num1 + num2), numT),
          numT
        ]
      }

      if (res[14]['status']) {
        this.dataPieRetread = [
          {
            name: 'Nuevo',
            value: res[14]['neumaticos_detalle'][0]['neumaticos_nuevos']
          },
          {
            name: 'Reencaunchado',
            value: res[14]['neumaticos_detalle'][0]['neumaticos_reencauchados']
          }
        ]
        this.total[14] = [...this.dataPieRetread].reduce((a, b) => a + b.value, 0)
      }

      if (res[15]['status']) {
        this.dataBarRetreadability = [res[15]['indice_reencauchabilidad']]
        this.total[15] = 1
      }

      if (res[16]['status']) {
        this.total[16] = [...res[16]['data']].length
        let inspect = [...res[16]['data']].map((dt, ind, arr) => {
          let positions = arr.filter(r => r.placa == dt.placa && r.fecha_inspeccion == dt.fecha_inspeccion)
            .sort((a, b) => a.posicion - b.posicion)

          return {
            ...dt,
            first: arr.findIndex(r => r.placa == dt.placa && r.fecha_inspeccion == dt.fecha_inspeccion) === ind,
            pos: positions.length
          }
        })

        this.allInspections = inspect
      }

      if (res[17]['status']) {
        this.costListMonths = [...res[17]['mes_data']].map(mt => formatDate(`2021-${mt.fecha_mes}-15`, 'MMMM', this.locale))
        this.costList = [...res[17]['data']].map((dt, ind, arr) => {
          const repites = arr.filter(r => r.marca == dt.marca && r.modelo == dt.modelo)
          return {
            ...dt,
            first: arr.findIndex(r => r.marca == dt.marca && r.modelo == dt.modelo) === ind,
            months: [...res[17]['mes_data']].map(mt => {
              let color = 'green'
              const el = repites.find(r => r.fecha_mes == mt.fecha_mes)
              if (Number(el.indicador) > Number(el.criterio_superior)) {
                color = "orange"
              }
              if (Number(el.indicador) > Number(el.criterio_inferior)) {
                color = "red"
              }
              return {
                num: el.indicador,
                color
              }
            })
          }
        }).filter(ct => ct.first)

      }
      console.log(res)
    }, error => {
      console.log('error')
      
      this.load = false
    })
  }

  calculatePercent(num, total) {
    let cal = (num / total) * 100
    return Math.round(cal * 10) / 10
  }

  monthDiff(dateFrom, dateTo) {
    return dateTo.getMonth() - dateFrom.getMonth() +
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
  }

  reStart() {
    this.data = false
    this.noData = false

    this.noDataMessage = []

    this.equipments = []
    this.serviceList = []
    this.irregularList = []
    //gráficos
    this.dataPieTires = []
    this.dataPieBrand = []
    this.dataBarD = []
    this.dataBarT = []
    this.dataBarA = []

    this.dataPieTireI = []
    this.dataPiePreasure = []

    this.dataPieRetread = []
    this.dataBarRetreadability = []

    //tablas especiales
    this.levelsUnit = []
    this.levelsNum = []
    this.levelsUnitTotal = []
    this.levelsMeasure = []
    this.levelsMeasureNum = []
    this.levelsMeasureTotal = []

    this.allInspections = []
    this.costList = []
    this.p = 1
  }

}
