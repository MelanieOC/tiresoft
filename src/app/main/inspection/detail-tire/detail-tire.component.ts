import { LOCALE_ID, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';
import { formatDate, formatNumber } from '@angular/common';
import { InspectionService } from 'src/app/services/inspection.service';

@Component({
  selector: 'app-detail-tire',
  templateUrl: './detail-tire.component.html',
  styleUrls: ['./detail-tire.component.scss']
})
export class DetailTireComponent implements OnInit {
  detailForm: FormGroup

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    public dialogRef: MatDialogRef<DetailTireComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dbs: DatabaseService,
    private inspectionService: InspectionService
  ) { }

  ngOnInit(): void {
    this.detailForm = this.formBuilder.group({
      position: [null],
      tire: [null],
      ubication: [null],
      serie: [null],
      date: [null],
      millage: [null],
      model: [null],
      brand: [null],
      measure: [null]
    })

    const formR = new FormData();
    formR.append('neumatico_id', this.data.id);
    formR.append('cliente_id', this.dbs.customerSelect.value.id_cliente);

    this.inspectionService.getDetail(formR).subscribe(res => {
      const data = res['data'][0]
      const det = {
        position: this.data.row.name,
        tire: data.neumatico_id,
        ubication: data.ubicacion,
        serie: data.num_serie,
        date: formatDate(data.fecha_instalacion, 'dd/MM/yyyy', this.locale),
        millage: formatNumber(data.km_instalacion, this.locale),
        model: data.modelo,
        brand: data.marca,
        measure: data.medida
      }

      this.detailForm.setValue(det)
    })
  }

  goInspection() {
    this.dialogRef.close({ action: true })
  }

}
