import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';

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
    { name: 'Presión', slug: 'presion' }, //modificar más tipo presión
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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    let select = this.dbs.customerSelect.value
    const formData = new FormData();
    formData.append('cliente_id', select.id_cliente);
    formData.append('identificador', this.data.id);

    this.dbs.listDetailInspections(formData).subscribe((response: any) => {
      this.loader = false
      this.allData = response.data.map(r => {
        r['condicion'] = r.nuevo_or_reencauchado == 1 ? 'Nuevo' : 'Reencauchado'
        r['presion'] = r.presion + ' ' + r.tipo_presion
        r['piton'] = this.dbs.caps.find(el => el.id == r.valvula).name
        return r
      })
    }, error => {

    });
  }

  edit(event){
    console.log(event)
  }

}
