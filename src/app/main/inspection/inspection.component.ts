import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { InspectionListDialogComponent } from './inspection-list-dialog/inspection-list-dialog.component';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss']
})
export class InspectionComponent implements OnInit {

  allData: any = []
  data: any = []
  columns = [
    { name: 'ID', slug: 'identificador' },
    //{ name: 'Cod. Inpección', slug: 'code' },
    { name: 'Placa Vehículo', slug: 'placa' },
    { name: 'Código Vehículo', slug: 'codigo' },
    { name: 'Tipo Vehículo', slug: 'nomtipo' },
    { name: 'Fecha Inspección', slug: 'date' },
    { name: 'Km/Hr de Inspección', slug: 'km_inspeccion' }
  ]

  constructor(
    private dbs: DatabaseService,
    private auth: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dbs.getTypeCap().subscribe(res => {
      let caps = res['tipo_tapa']
      let arr = []
      Object.keys(caps).forEach(k => {
        arr.push({
          id: k,
          name: caps[k]
        })
      })
      this.dbs.caps = arr
    })
    let select = this.dbs.customerSelect.value
    const formData = new FormData();
    formData.append('cliente_id', select.id_cliente);

    this.dbs.listInspections(formData).subscribe((response: any) => {
      this.allData = response.data.map(el => {
        el['date'] = el.fecha_inspeccion
        return el
      })
    }, error => {

    });
  }

  getDateFormat(date) {
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let day = ('0' + date.getDate()).slice(-2)
    return `${date.getFullYear()}-${month}-${day}`
  }

  editRegister(res) {
    console.log(res)

  }

  optionsDialog(res) {
    this.dialog.open(InspectionListDialogComponent, {
      data: {
        id: res.identificador
      }
    })
  }
}
