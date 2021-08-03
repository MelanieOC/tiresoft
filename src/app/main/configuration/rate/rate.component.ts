import { LOCALE_ID, Inject, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DatabaseService } from 'src/app/services/database.service';
import { RateService } from 'src/app/services/rate.service';
import { RegisterRateComponent } from './register-rate/register-rate.component';
import { formatDate, formatNumber } from '@angular/common';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  date = ''
  cambio: any = null

  allData: any = [
    { id: '1', value: 3.6550, date: '22/02/2021', status: 'Activo' }
  ]

  columns = [
    { name: 'ID', slug: 'id', stick: true },
    { name: 'Valor', slug: 'valor', stick: true },
    { name: 'Fecha', slug: 'date', stick: false },
    { name: 'Estado', slug: 'status', stick: true }
  ]

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = []
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private dialog: MatDialog,
    private dbs: DatabaseService,
    private rateService: RateService
  ) { }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(cl => cl.slug)
    this.dataSource.data = this.allData

    /*this.dbs.getRateSunat().subscribe(res => {
      if (res['response']) {
        this.cambio = res['response']
      }
    })*/
    this.getData()
  }

  getData() {
    this.rateService.getList().subscribe(res => {
      this.allData = res['data'].map(el => {
        el.date = formatDate(el.fecha, 'dd/MM/yyyy', this.locale)
        el.status = el.estado ? 'Activo' : 'Inactivo'
        return el
      }).sort((a, b) => b.id - a.id)
      console.log(res)
    })
  }
  
  openDialog() {
    this.dialog.open(RegisterRateComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false
    }).afterClosed().subscribe(res=>{
      if(res){
        this.getData()
      }
    })
  }

}
