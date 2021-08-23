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
  levelsMeasure = []

  allInspections = []
  p: number = 1;

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

    combineLatest(
      this.reportService.getInspectedEquipment(send),//0
      this.reportService.getMeasuresDistribution(send),//1
      this.reportService.getBrandPosition(send),//2
      this.reportService.getBrandEjeA(send),//3
      this.reportService.getBrandEjeD(send),//4
      this.reportService.getBrandEjeT(send),//5
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
      this.reportService.getInspections(send)//16
    ).subscribe(res => {
      this.load = false
      this.data = res.filter((r, i) => i < 6 || i > 8).reduce((a, b) => a || b['status'], false)
      this.noData = !this.data
      this.noDataMessage = res.map(r => r['message'])
      if (res[0]['status']) {
        this.equipments = res[0]['data']
      }
      if (res[1]['status']) {
        this.dataPieTires = [...res[1]['data']].map(dt => {
          return {
            name: dt.medida,
            value: dt.total_medidas
          }
        })

      }
      if (res[2]['status']) {
        this.dataPieBrand = [...res[2]['data']].map(dt => {
          return {
            name: dt.marca,
            value: dt.total_marcas
          }
        })
      }
      if (res[3]['status']) {


      }
      if (res[4]['status']) {
        this.dataBarD[0] = [...res[4]['data']].map(dt => dt.marca)
        this.dataBarD[1] = [...res[4]['data']].map(dt => dt.total_marcas)
      }
      if (res[5]['status']) {
        this.dataBarT[0] = [...res[5]['data']].map(dt => dt.marca)
        this.dataBarT[1] = [...res[5]['data']].map(dt => dt.total_marcas)
      }
      if (res[8]['status'] && res[8]['data']) {
        const maxNum = [...res[8]['data']].sort((a, b) => b.posicion - a.posicion)[0].posicion
        console.log(maxNum)
        for (let index = 1; index <= maxNum; index++) {
          this.levelsNum.push(index)
        }
        let level = [...res[8]['data']].map((dt, ind, arr) => {
          let repites = arr.filter(r => r.placa == dt.placa)
          let positions = []
          for (let index = 1; index <= maxNum; index++) {
            const element = repites.find(rp => rp.posicion == index)
            let color = 'white'
            if (element) {
              const num = Math.min(Number(element.interior), Number(element.exterior), Number(element.medio || 50))
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
          return {
            ...dt,
            first: dt.pos_inicial == dt.posicion,
            positions,
            remind: positions.filter(p => p.color == 'orange').length,
            next: positions.filter(p => p.color == 'blue').length
          }
        })

        this.levelsUnit = level.filter(lv => lv.first)
        this.levelsUnitTotal = [
          this.levelsUnit.reduce((a, b) => a + b.nroneumaticos, 0),
          this.levelsUnit.reduce((a, b) => a + b.remind, 0),
          this.levelsUnit.reduce((a, b) => a + b.next, 0)
        ]
      }
      if (res[9]['status']) {
        this.serviceList = res[9]['data']
      }
      if (res[10]['status']) {
        this.irregularList = res[10]['data']
      }
      if (res[11]['status']) {
        this.dataPieTireI = [...res[11]['data']].map(dt => {
          return {
            name: dt.tipo_inflado,
            value: dt.total
          }
        })
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
      }

      if (res[13]['status']) {
        /*this.dataPiePreasure = [...res[12]['data']].map(dt => {
          return {
            name: dt.tipo_inflado,
            value: dt.total
          }
        })*/
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
      }

      if (res[15]['status']) {
        this.dataBarRetreadability = [res[15]['indice_reencauchabilidad']]
      }

      if (res[16]['status']) {
        let inspect = [...res[16]['data']].map((dt, ind, arr) => {
          let positions = arr.filter(r => r.placa == dt.placa && r.fecha_inspeccion == dt.fecha_inspeccion)
            .sort((a, b) => a.posicion - b.posicion)

          return {
            first: arr.findIndex(r => r.placa == dt.placa && r.fecha_inspeccion == dt.fecha_inspeccion) === ind,
            positions,
            pos: positions.length
          }
        })

        this.allInspections = inspect.filter(lv => lv.first)
      }
      console.log(res)
    })
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

    this.allInspections = []
    this.p = 1
  }

}
