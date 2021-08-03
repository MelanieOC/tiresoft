import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MediaqueryService } from 'src/app/services/mediaquery.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-error',
  templateUrl: './table-error.component.html',
  styleUrls: ['./table-error.component.scss']
})
export class TableErrorComponent implements OnInit {

  @Input() data: any[]
  @Input() columns: any[]

  @Output() onAction = new EventEmitter<any>();

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = []


  @ViewChild('paginator', { static: false }) set content(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort, { static: false }) set content2(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(el => el.slug)
  }


  ngOnChanges() {
    this.dataSource.data = this.data
  }

  /*edit(event, row, type) {
    event.stopPropagation();
    this.onAction.emit({ row, type })
  }*/

  edit(fruit): void {
    if (fruit.edit) {
      //this.emitData()
    }
    fruit.edit = !fruit.edit

  }

  keydown(event, w): void {
    if (w.edit) {
      if (event.keyCode === 13) {
        this.edit(w)
      }
    }
  }
}
