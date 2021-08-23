import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { InspectionListDialogComponent } from '../inspection-list-dialog/inspection-list-dialog.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { InspectionService } from 'src/app/services/inspection.service';

@Component({
  selector: 'app-inspection-reports',
  templateUrl: './inspection-reports.component.html',
  styleUrls: ['./inspection-reports.component.scss']
})
export class InspectionReportsComponent implements OnInit {

  allData: any = []
  data: any = []
  columns = [
    { name: 'Opciones', slug: 'options', stick: true, width: 100 },
    { name: 'ID', slug: 'identificador', stick: true },
    { name: 'Placa Vehículo', slug: 'placa', stick: true },
    { name: 'Código Vehículo', slug: 'codigo', stick: true },
    { name: 'Tipo Vehículo', slug: 'nomtipo', stick: false },
    { name: 'Fecha Inspección', slug: 'date', stick: false },
    { name: 'Km/Hr de Inspección', slug: 'km_inspeccion', stick: false }
  ]

  actions = [
    { icon: 'edit', id: 1, tooltip: 'editar' },
    { icon: 'list', id: 2, tooltip: 'lista' }
  ]
  caps: any = []
  constructor(
    private dbs: DatabaseService,
    private inspectionService: InspectionService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    let select = this.dbs.customerSelect.value
    if (select) {
      const formData = new FormData();
      formData.append('cliente_id', select.id_cliente);

      this.inspectionService.listInspections(formData).subscribe((response: any) => {
        this.allData = response.data.map(el => {
          el['date'] = this.datePipe.transform(el.fecha_inspeccion, 'dd-MM-yyy')
          return el
        })
      }, error => {

      });
    } else {
      this.router.navigate(['/main/clientes'])
    }

  }

  getDateFormat(date) {
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let day = ('0' + date.getDate()).slice(-2)
    return `${date.getFullYear()}-${month}-${day}`
  }

  getAction(data) {
    switch (data.type) {
      case 1:
        this.editRegister(data.row)
        break;
      case 2:
        this.optionsDialog(data.row)
        break;
      default:
        break;
    }
  }

  editRegister(row) {
    console.log(row)
  }

  optionsDialog(res) {
    this.dialog.open(InspectionListDialogComponent, {
      data: {
        id: res.identificador,
        data: res
      }
    })
  }


}
