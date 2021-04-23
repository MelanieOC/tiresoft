import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { TireFormComponent } from '../../tire-form/tire-form.component';

@Component({
  selector: 'app-inspection-list-dialog',
  templateUrl: './inspection-list-dialog.component.html',
  styleUrls: ['./inspection-list-dialog.component.scss']
})
export class InspectionListDialogComponent implements OnInit {
  loader: boolean = true
  allData: any = []
  columns = [
    { name: 'Pos', slug: 'posicion' },
    { name: 'Serie neumático', slug: 'num_serie' },
    { name: 'Marca', slug: 'marca' },
    { name: 'Modelo', slug: 'modelo' },
    { name: 'Medida', slug: 'medida' },
    { name: 'Eje', slug: 'eje' },
    { name: 'Condición', slug: 'condicion' },//modificar
    { name: 'Número Reencauche', slug: 'cantidad_reencauche' },
    { name: 'Empresa Reencauchadora', slug: 'empresa_reencauchadora' },
    { name: 'Presión', slug: 'presionS' }, //modificar más tipo presión
    { name: 'Tapa de Pitón', slug: 'piton' }, //modificar
    { name: 'Estado', slug: 'estado' },
    { name: 'Km de instalación', slug: 'km_instalacion' },
    { name: 'Km Recorrido', slug: 'km_recorrido' },
    { name: 'Km Proyectado', slug: 'km_proyectado' },
    { name: 'Recomendación', slug: 'recomendacion' }
  ]

  constructor(
    private dbs: DatabaseService,
    private dialogRef: MatDialogRef<InspectionListDialogComponent>,
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

    this.dbs.listDetailInspections(formData).subscribe((response: any) => {
      this.loader = false
      this.allData = response.data.map(r => {
        r['condicion'] = r.nuevo_or_reencauchado == 1 ? 'Nuevo' : 'Reencauchado'
        r['presionS'] = r.presion + ' ' + r.tipo_presion
        r['piton'] = this.dbs.caps.find(el => el.id == r.valvula).name
        return r
      })
    }, error => {

    });
  }

  edit(row) {
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

    this._bottomSheet.open(TireFormComponent, {
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
