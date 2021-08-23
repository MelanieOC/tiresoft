import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { InspectionTireFormComponent } from 'src/app/components/inspection-tire-form/inspection-tire-form.component';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { InspectionService } from 'src/app/services/inspection.service';


@Component({
  selector: 'app-inspection-list-dialog',
  templateUrl: './inspection-list-dialog.component.html',
  styleUrls: ['./inspection-list-dialog.component.scss']
})
export class InspectionListDialogComponent implements OnInit {
  loader: boolean = true
  allData: any = []
  columns = [
    { name: 'Acciones', slug: 'options', stick: true, width: 70 },
    { name: 'Pos', slug: 'posicion', stick: true },
    { name: 'Serie neumático', slug: 'num_serie', stick: true, width: 80 },
    { name: 'Marca', slug: 'marca', stick: true, width: 100 },
    { name: 'Modelo', slug: 'modelo', stick: false, width: 100 },
    { name: 'Medida', slug: 'medida', stick: false, width: 110 },
    { name: 'Eje', slug: 'eje', stick: false, width: 80 },
    { name: 'Condición', slug: 'condicion', stick: false },//modificar
    { name: 'Número Reencauche', slug: 'cantidad_reencauche', stick: false },
    { name: 'Empresa Reencauchadora', slug: 'empresa_reencauchadora', stick: false },
    { name: 'Presión', slug: 'presionS', stick: false, width: 70 }, //modificar más tipo presión
    { name: 'Tapa de Pitón', slug: 'piton', stick: false, width: 120 }, //modificar
    { name: 'Estado', slug: 'estado', stick: false, width: 150 },
    { name: 'Km de instalación', slug: 'km_instalacion', stick: false, width: 85 },
    { name: 'Km Recorrido', slug: 'km_recorrido', stick: false },
    { name: 'Km Proyectado', slug: 'km_proyectado', stick: false },
    { name: 'Recomendación', slug: 'recomendacion', stick: false, width: 180 }
  ]

  actions = [
    { icon: 'edit', id: 1, tooltip: 'editar' }
  ]

  constructor(
    private dbs: DatabaseService,
    private inspectionService: InspectionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthService,
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    let select = this.dbs.customerSelect.value
    const formData = new FormData();
    formData.append('cliente_id', select.id_cliente);
    formData.append('identificador', this.data.id);

    this.inspectionService.listDetailInspections(formData).subscribe((response: any) => {
      this.loader = false
      this.allData = response.data.map(r => {
        r['condicion'] = r.nuevo_or_reencauchado == 1 ? 'Nuevo' : 'Reencauchado'
        r['presionS'] = r.presion + ' ' + r.tipo_presion
        r['piton'] = this.inspectionService.caps.find(el => el.id == r.valvula) ? this.inspectionService.caps.find(el => el.id == r.valvula).name : ''
        return r
      })
    }, error => {

    });
  }

  edit(ev) {
    const row = ev.row
    let info = {
      identificador: row.identificador,
      codigo: '',
      vehiculo_id: '',
      f_inspeccion: new Date(this.data.data.fecha_inspeccion),
      km_inspeccion: Number(this.data.data.km_inspeccion),
      planta_id: '',
      repuesto: 0,
      portallantas: 0,
      crated_user: this.auth.user.value.id
    }

    this._bottomSheet.open(InspectionTireFormComponent, {
      data: {
        row: row,
        id: row.neumatico_id,
        info: info,
        edit: true
      }
    }).afterDismissed().pipe(take(1)).subscribe(res => {
      if (res) {
        if (res.row) {
          this.loader = true
          this.getAll()
        }
      }
    })
  }

}
