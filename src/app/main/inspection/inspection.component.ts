import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { InspectionListDialogComponent } from './inspection-list-dialog/inspection-list-dialog.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
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

  caps: any = []

  constructor(
    private dbs: DatabaseService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    let select = this.dbs.customerSelect.value
    if(select){
      const formData = new FormData();
      formData.append('cliente_id', select.id_cliente);
  
      this.dbs.listInspections(formData).subscribe((response: any) => {
        this.allData = response.data.map(el => {
          el['date'] = this.datePipe.transform(el.fecha_inspeccion, 'dd-MM-yyy')
          return el
        })
      }, error => {
  
      });
    }else{
      this.router.navigate(['/main/clientes'])
    }
    
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
        id: res.identificador,
        data: res
      }
    })
  }

}
